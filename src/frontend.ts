import { AcurastClient } from "@acurast/dapp";
import { generateKey, getSenderId } from "./crypto-utils";

let client: AcurastClient | null = null;

// Configuration storage keys
const URLS_KEY = "acurast_websocket_urls";
const RECIPIENTS_KEY = "acurast_recipients";
const PAYLOAD_KEY = "acurast_payload";
const API_KEY = "acurast_api_key";

// Default values
const DEFAULT_URLS: string[] = [];

const DEFAULT_RECIPIENTS = [
  {
    name: "Test",
    processorAddress:
      "5000000000000000000000000000000000000000000000000000000000000000",
    isGateKeeper: true,
    pubkey:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
];

const DEFAULT_PAYLOAD = {
  jsonrpc: "2.0",
  method: "ping",
  params: {},
};

// Load configuration from localStorage
function loadConfig() {
  try {
    const urls: string[] = JSON.parse(
      localStorage.getItem(URLS_KEY) || JSON.stringify(DEFAULT_URLS)
    );
    const recipients: Recipient[] = JSON.parse(
      localStorage.getItem(RECIPIENTS_KEY) || JSON.stringify(DEFAULT_RECIPIENTS)
    );
    const storedPayload = JSON.parse(
      localStorage.getItem(PAYLOAD_KEY) || JSON.stringify(DEFAULT_PAYLOAD)
    );
    // Remove id and apiKey if they somehow got stored
    const { id, apiKey, ...cleanPayload } = storedPayload;
    return { urls, recipients, payload: cleanPayload };
  } catch (e) {
    return {
      urls: DEFAULT_URLS,
      recipients: DEFAULT_RECIPIENTS,
      payload: DEFAULT_PAYLOAD,
    };
  }
}

// Update UI lists
function updateLists() {
  const { urls, recipients, payload } = loadConfig();

  const urlsList = document.getElementById("websocket-urls-list")!;
  urlsList.innerHTML = urls.map((url: string) => `<li>${url}</li>`).join("");

  const recipientsList = document.getElementById("recipients-list")!;
  recipientsList.innerHTML = recipients
    .map(
      (r: { name: string; pubkey: string }) => `
    <li>
      <label>
        <input type="checkbox" class="recipient-checkbox" data-pubkey="${r.pubkey}" checked>
        ${r.name}
      </label>
    </li>
  `
    )
    .join("");

  // Add event listener for select all checkbox
  const selectAllCheckbox = document.getElementById(
    "select-all-recipients"
  ) as HTMLInputElement;
  const recipientCheckboxes = document.querySelectorAll(
    ".recipient-checkbox[data-pubkey]"
  ) as NodeListOf<HTMLInputElement>;

  selectAllCheckbox.addEventListener("change", () => {
    recipientCheckboxes.forEach((checkbox) => {
      checkbox.checked = selectAllCheckbox.checked;
    });
  });

  // Add event listener for individual checkboxes
  recipientCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const allChecked = Array.from(recipientCheckboxes).every(
        (cb) => cb.checked
      );
      selectAllCheckbox.checked = allChecked;
    });
  });

  const payloadInput = document.getElementById(
    "request-payload"
  ) as HTMLTextAreaElement;
  // Remove id and apiKey before displaying
  const { id, apiKey, ...cleanPayload } = payload;
  payloadInput.value = JSON.stringify(cleanPayload, null, 2);
}

// Get selected recipients
function getSelectedRecipients(): Recipient[] {
  const { recipients } = loadConfig();
  const selectedPubkeys = new Set(
    Array.from(
      document.querySelectorAll(".recipient-checkbox[data-pubkey]:checked")
    ).map((checkbox) => (checkbox as HTMLInputElement).dataset.pubkey)
  );
  return recipients.filter((r) => selectedPubkeys.has(r.pubkey));
}

// Initialize modals
function initModals() {
  const { urls, recipients } = loadConfig();

  // URLs modal
  const urlsModal = document.getElementById("urls-modal") as HTMLDialogElement;
  const urlsInput = document.getElementById(
    "urls-input"
  ) as HTMLTextAreaElement;
  document.getElementById("set-urls-btn")?.addEventListener("click", () => {
    urlsInput.value = JSON.stringify(urls, null, 2);
    urlsModal.showModal();
  });

  document.getElementById("urls-save")?.addEventListener("click", () => {
    try {
      const newUrls = JSON.parse(urlsInput.value);
      if (
        !Array.isArray(newUrls) ||
        !newUrls.every((url) => typeof url === "string")
      ) {
        throw new Error("Invalid URLs format");
      }
      localStorage.setItem(URLS_KEY, JSON.stringify(newUrls));
      updateLists();
      urlsModal.close();
    } catch (e) {
      alert("Invalid JSON format for URLs");
    }
  });

  // Recipients modal
  const recipientsModal = document.getElementById(
    "recipients-modal"
  ) as HTMLDialogElement;
  const recipientsInput = document.getElementById(
    "recipients-input"
  ) as HTMLTextAreaElement;
  document
    .getElementById("set-recipients-btn")
    ?.addEventListener("click", () => {
      recipientsInput.value = JSON.stringify(recipients, null, 2);
      recipientsModal.showModal();
    });

  document.getElementById("recipients-save")?.addEventListener("click", () => {
    try {
      const newRecipients = JSON.parse(recipientsInput.value);
      if (
        !Array.isArray(newRecipients) ||
        !newRecipients.every(
          (r) =>
            typeof r === "object" &&
            r.name &&
            r.pubkey &&
            typeof r.pubkey === "string"
        )
      ) {
        throw new Error("Invalid recipients format");
      }
      localStorage.setItem(RECIPIENTS_KEY, JSON.stringify(newRecipients));
      updateLists();
      recipientsModal.close();
    } catch (e) {
      alert("Invalid JSON format for recipients");
    }
  });
}

// Initialize payload handling
function initPayloadHandling() {
  const payloadInput = document.getElementById(
    "request-payload"
  ) as HTMLTextAreaElement;
  let timeoutId: number | null = null;

  payloadInput.addEventListener("input", () => {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      try {
        const payload = JSON.parse(payloadInput.value);
        // Only store if not a ping or checknode request
        if (payload.method !== "ping" && payload.method !== "checkNodes") {
          // Always remove id and apiKey before storing
          const { id, apiKey, ...cleanPayload } = payload;
          localStorage.setItem(PAYLOAD_KEY, JSON.stringify(cleanPayload));
        }
      } catch (e) {
        // Don't save invalid JSON
      }
    }, 500);
  });
}

// Initialize API key handling
function initApiKeyHandling() {
  const apiKeyInput = document.getElementById("api-key") as HTMLInputElement;
  const apiKeyStatus = document.getElementById("api-key-status")!;
  const apiKeyInputContainer = apiKeyInput.closest(".input-with-status")!;
  const apiKeySetContainer = document.getElementById("api-key-set")!;
  const buttons = [
    document.getElementById("send-ping-btn"),
    document.getElementById("send-node-check-btn"),
    document.getElementById("connect-btn"),
  ];

  function showApiKeySet(value: boolean) {
    (apiKeyInputContainer as HTMLElement).style.display = value
      ? "none"
      : "flex";
    (apiKeySetContainer as HTMLElement).style.display = value
      ? "block"
      : "none";
    if (value) {
      buttons.forEach((btn) => btn?.removeAttribute("disabled"));
    } else {
      buttons.forEach((btn) => btn?.setAttribute("disabled", "true"));
    }
  }

  // Load saved API key
  const savedApiKey = localStorage.getItem(API_KEY);
  if (savedApiKey) {
    apiKeyInput.value = savedApiKey;
    showApiKeySet(true);
  } else {
    showApiKeySet(false);
  }

  // Handle API key input
  apiKeyInput.addEventListener("input", () => {
    const value = apiKeyInput.value.trim();
    if (value) {
      localStorage.setItem(API_KEY, value);
      showApiKeySet(true);
    }
  });

  // Handle delete button
  document.getElementById("delete-api-key")?.addEventListener("click", () => {
    localStorage.removeItem(API_KEY);
    apiKeyInput.value = "";
    showApiKeySet(false);
  });
}

async function connect() {
  const { urls } = loadConfig();
  const { privateKeyRaw, publicKeyRaw } = await generateKey();

  client = new AcurastClient(urls);

  await client.start({
    secretKey: Buffer.from(privateKeyRaw).toString("hex"),
    publicKey: Buffer.from(publicKeyRaw).toString("hex"),
  });

  return client;
}

interface Recipient {
  name: string;
  pubkey: string;
  processorAddress: string;
  isGateKeeper: boolean;
}

interface ResponseMessage {
  id: string;
  jsonrpc: string;
  result?: any;
  error?: any;
}

interface PingResponse extends ResponseMessage {
  result?: {
    version: string;
  };
}

interface NodeResponse {
  status: "fulfilled" | "rejected";
  value?: {
    url: string;
  };
  reason?: {
    url: string;
    reason: string;
  };
}

interface NodeCheckResponse extends ResponseMessage {
  result?: {
    data: {
      responses: [
        {
          status: "fulfilled" | "rejected";
          value?: {
            responses: NodeResponse[];
          };
          reason?: string;
        },
        {
          status: "fulfilled" | "rejected";
          value?: {
            responses: NodeResponse[];
          };
          reason?: string;
        }
      ];
    };
  };
}

interface PingResult {
  recipient: Recipient;
  responseTime: number;
  version?: string;
  status: "success" | "timeout";
}

// Create or update a result box for a recipient
function createOrUpdateResultBox(
  recipient: Recipient,
  status: "pending" | "success" | "error" = "pending"
) {
  const resultsContainer = document.getElementById("results-container")!;
  let resultBox = document.getElementById(`result-${recipient.pubkey}`);

  if (!resultBox) {
    resultBox = document.createElement("div");
    resultBox.id = `result-${recipient.pubkey}`;
    resultBox.innerHTML = `
      <h4>${recipient.name} ${recipient.isGateKeeper ? "🔐" : ""}</h4>
      <div class="content"></div>
    `;
    resultsContainer.appendChild(resultBox);
  }

  resultBox.className = `result-box ${status}`;
  return resultBox.querySelector(".content")!;
}

// Add function to create node check table
function createNodeCheckTable(
  recipient: Recipient,
  response: NodeCheckResponse
): HTMLElement {
  const container = document.createElement("div");
  container.className = "node-check-result";

  const table = document.createElement("table");
  table.className = "ping-results";

  let content = `
    <tr>
      <td colspan="2"><strong>${recipient.name} ${
    recipient.isGateKeeper ? "🔐" : ""
  }</strong></td>
    </tr>
  `;

  if (response.result?.data.responses[0]) {
    content += '<tr><td colspan="2"><strong>BTC</strong></td></tr>';
    const btcResponses = response.result.data.responses[0];
    if (btcResponses.status === "fulfilled" && btcResponses.value) {
      btcResponses.value.responses.forEach((response) => {
        if (response.status === "fulfilled" && response.value) {
          content += `<tr><td style="padding-left: 20px">✅</td><td>${response.value.url}</td></tr>`;
        } else if (response.status === "rejected" && response.reason) {
          content += `<tr class="timeout"><td style="padding-left: 20px">❌</td><td>${response.reason.url}: ${response.reason.reason}</td></tr>`;
        }
      });
    } else if (btcResponses.status === "rejected") {
      content += `<tr class="timeout"><td colspan="2" style="padding-left: 20px">Error: ${btcResponses.reason}</td></tr>`;
    }
  }

  if (response.result?.data.responses[1]) {
    content += '<tr><td colspan="2"><strong>XTZ</strong></td></tr>';
    const xtzResponses = response.result.data.responses[1];
    if (xtzResponses.status === "fulfilled" && xtzResponses.value) {
      xtzResponses.value.responses.forEach((response) => {
        if (response.status === "fulfilled" && response.value) {
          content += `<tr><td style="padding-left: 20px">✅</td><td>${response.value.url}</td></tr>`;
        } else if (response.status === "rejected" && response.reason) {
          content += `<tr class="timeout"><td style="padding-left: 20px">❌</td><td>${response.reason.url}: ${response.reason.reason}</td></tr>`;
        }
      });
    } else if (xtzResponses.status === "rejected") {
      content += `<tr class="timeout"><td colspan="2" style="padding-left: 20px">Error: ${xtzResponses.reason}</td></tr>`;
    }
  }

  table.innerHTML = content;
  container.appendChild(table);
  return container;
}

// Add logging function
function logMessage(direction: "outgoing" | "incoming", message: any) {
  const timestamp = new Date().toISOString();
  console.log(
    `[${timestamp}] ${direction === "outgoing" ? "→" : "←"} ${JSON.stringify(
      message,
      null,
      2
    )}`
  );
}

// Add loading indicator functions
function showLoading() {
  const indicator = document.querySelector(".loading-indicator");
  indicator?.classList.add("active");
}

function hideLoading() {
  const indicator = document.querySelector(".loading-indicator");
  indicator?.classList.remove("active");
}

// Update handlePingRequest function
async function handlePingRequest() {
  const apiKey = localStorage.getItem(API_KEY);
  if (!apiKey) return;

  const recipients = getSelectedRecipients();
  if (recipients.length === 0) {
    alert("Please select at least one recipient");
    return;
  }

  showLoading();

  const resultsContainer = document.getElementById("results-container")!;
  const pingResultsTable = document.getElementById("ping-results")!;
  const pingResultsBody = pingResultsTable.querySelector("tbody")!;

  resultsContainer.style.display = "none";
  pingResultsTable.style.display = "table";

  // Initialize results with pending state for all recipients
  const results = new Map<string, PingResult>();
  const requestIds = new Map<string, string>(); // Store request ID -> pubkey mapping

  recipients.forEach((recipient) => {
    results.set(recipient.pubkey, {
      recipient,
      responseTime: 0,
      status: "timeout",
      version: "pending...",
    });
  });
  updatePingResults(results);

  const startTimes = new Map<string, number>();

  try {
    client = await connect();

    // Set up message handler for ping responses
    client.onMessage((message: { payload: Uint8Array }) => {
      const payload = Buffer.from(message.payload).toString("utf8");
      try {
        const json = JSON.parse(payload) as PingResponse;
        logMessage("incoming", json);

        // Find recipient by request ID
        const recipientPubkey = requestIds.get(json.id);
        const recipient = recipientPubkey
          ? recipients.find((r) => r.pubkey === recipientPubkey)
          : null;

        if (recipient) {
          const startTime = startTimes.get(recipient.pubkey) || 0;
          const responseTime = Date.now() - startTime;

          results.set(recipient.pubkey, {
            recipient,
            responseTime,
            version: json.result?.version,
            status: "success",
          });

          updatePingResults(results);
        }
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    });

    // Send ping requests
    for (const recipient of recipients) {
      startTimes.set(recipient.pubkey, Date.now());

      const requestId = Math.random().toString(36).substring(2, 15);
      requestIds.set(requestId, recipient.pubkey); // Store the mapping

      const request = {
        jsonrpc: "2.0",
        method: "ping",
        params: {},
        id: requestId,
        apiKey,
      };

      logMessage("outgoing", { ...request, recipient: recipient.name });

      try {
        await client.send(
          recipient.pubkey.substring(2),
          Buffer.from(JSON.stringify(request)).toString("hex")
        );
      } catch (error) {
        results.set(recipient.pubkey, {
          recipient,
          responseTime: 0,
          status: "timeout",
        });
        updatePingResults(results);
      }
    }

    // Set timeouts for non-responding recipients
    setTimeout(() => {
      for (const recipient of recipients) {
        const result = results.get(recipient.pubkey);
        if (result?.status !== "success") {
          results.set(recipient.pubkey, {
            recipient,
            responseTime: 0,
            status: "timeout",
          });
        }
      }
      updatePingResults(results);
      hideLoading();
    }, 10000);
  } catch (error) {
    console.error("Error during ping:", error);
    pingResultsTable.style.display = "none";
    resultsContainer.style.display = "block";
    resultsContainer.innerHTML = `<div class="result-box error"><div class="content">Error: ${
      error instanceof Error ? error.message : String(error)
    }</div></div>`;
    hideLoading();
  }
}

function updatePingResults(results: Map<string, PingResult>) {
  const pingResultsBody = document.querySelector("#ping-results tbody")!;
  const sortedResults = Array.from(results.values()).sort((a, b) => {
    if (a.status === "success" && b.status !== "success") return -1;
    if (a.status !== "success" && b.status === "success") return 1;
    if (a.status === "timeout" && b.status !== "timeout") return 1;
    if (a.status !== "timeout" && b.status === "timeout") return -1;
    return a.responseTime - b.responseTime;
  });

  pingResultsBody.innerHTML = sortedResults
    .map(
      (result) => `
    <tr class="${result.status === "timeout" ? "timeout" : ""}">
      <td>${
        result.status === "success"
          ? "✅"
          : result.version === "pending..."
          ? "⏳"
          : "❌"
      } ${result.recipient.isGateKeeper ? "🔐" : ""}</td>
      <td>${
        result.status === "success"
          ? `${result.responseTime}ms`
          : result.version === "pending..."
          ? "waiting..."
          : "timeout"
      }</td>
      <td>${result.version || "-"}</td>
      <td>${result.recipient.name}</td>
    </tr>
  `
    )
    .join("");
}

// Initialize event listeners
document.addEventListener("DOMContentLoaded", () => {
  updateLists();
  initModals();
  initPayloadHandling();
  initApiKeyHandling();

  document
    .getElementById("send-ping-btn")
    ?.addEventListener("click", handlePingRequest);
  document
    .getElementById("send-node-check-btn")
    ?.addEventListener("click", () => {
      const payloadInput = document.getElementById(
        "request-payload"
      ) as HTMLTextAreaElement;
      payloadInput.value = JSON.stringify(
        {
          jsonrpc: "2.0",
          method: "checkNodes",
          params: {},
        },
        null,
        2
      );
      document.getElementById("connect-btn")?.click();
    });
});

// Update the connect button handler to include logging
document.getElementById("connect-btn")?.addEventListener("click", async () => {
  const apiKey = localStorage.getItem(API_KEY);
  if (!apiKey) return;

  try {
    const recipients = getSelectedRecipients();
    if (recipients.length === 0) {
      alert("Please select at least one recipient");
      return;
    }

    showLoading();

    const resultsContainer = document.getElementById("results-container")!;
    const pingResultsTable = document.getElementById("ping-results")!;

    resultsContainer.style.display = "block";
    pingResultsTable.style.display = "none";
    resultsContainer.innerHTML = ""; // Clear previous results

    client = await connect();

    const requestPayload = JSON.parse(
      (document.getElementById("request-payload") as HTMLTextAreaElement).value
    );

    // Add API key to the request payload
    requestPayload.apiKey = apiKey;

    // Set up message handlers for each recipient
    const messageHandlers = new Map<string, (content: string) => void>();
    const timeouts = new Map<string, NodeJS.Timeout>();
    const responseReceived = new Set<string>(); // Track which recipients have responded

    // Create result boxes and set up handlers
    for (const recipient of recipients) {
      const resultContent = createOrUpdateResultBox(recipient);
      resultContent.textContent = "Connecting...\n";

      messageHandlers.set(recipient.pubkey, (content: string) => {
        resultContent.textContent += content + "\n";
      });

      // Set up timeout
      const timeoutId = setTimeout(() => {
        if (!responseReceived.has(recipient.pubkey)) {
          const box = document.getElementById(`result-${recipient.pubkey}`);
          if (box) {
            createOrUpdateResultBox(recipient, "error");
            const content = box.querySelector(".content");
            if (content) {
              content.textContent =
                "Timeout: No response received after 10 seconds\n";
            }
          }
        }
        hideLoading();
      }, 10000);

      timeouts.set(recipient.pubkey, timeoutId);
    }

    client.onMessage((message: { payload: Uint8Array }) => {
      const payload = Buffer.from(message.payload).toString("utf8");
      try {
        const json = JSON.parse(payload) as ResponseMessage;
        logMessage("incoming", json);
        const recipient = recipients.find(
          (r: Recipient) => r.pubkey === json.id
        );
        if (recipient) {
          responseReceived.add(recipient.pubkey); // Mark this recipient as having responded
          // Clear timeout for this recipient
          const timeoutId = timeouts.get(recipient.pubkey);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeouts.delete(recipient.pubkey);
          }

          const resultBox = createOrUpdateResultBox(
            recipient,
            json.error ? "error" : "success"
          );
          resultBox.innerHTML = ""; // Clear existing content

          // Handle node check response
          if (requestPayload.method === "checkNodes" && !json.error) {
            const nodeCheckResponse = json as NodeCheckResponse;
            const tableContainer = createNodeCheckTable(
              recipient,
              nodeCheckResponse
            );
            resultBox.appendChild(tableContainer);
          }

          // Add the raw JSON response below
          const pre = document.createElement("pre");
          pre.style.marginTop = "20px";
          pre.textContent = JSON.stringify(json, null, 2);
          resultBox.appendChild(pre);

          // If all recipients have responded, hide loading
          if (responseReceived.size === recipients.length) {
            hideLoading();
          }
        }
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    });

    // Send requests
    for (const recipient of recipients) {
      const senderId = await getSenderId(recipient.pubkey);
      const handler = messageHandlers.get(recipient.pubkey);
      if (handler) {
        handler(`Sending request (${senderId})...`);
      }

      const request = {
        ...requestPayload,
        id: recipient.pubkey,
      };

      logMessage("outgoing", { ...request, recipient: recipient.name });

      try {
        await client.send(
          recipient.pubkey.substring(2),
          Buffer.from(JSON.stringify(request)).toString("hex")
        );
      } catch (error) {
        responseReceived.add(recipient.pubkey); // Mark as responded to prevent timeout
        // Clear timeout for this recipient
        const timeoutId = timeouts.get(recipient.pubkey);
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeouts.delete(recipient.pubkey);
        }

        const resultBox = createOrUpdateResultBox(recipient, "error");
        resultBox.textContent = `Error: ${
          error instanceof Error ? error.message : String(error)
        }`;
        hideLoading();
      }
    }

    // Clean up timeouts when closing
    window.addEventListener("beforeunload", () => {
      for (const timeoutId of timeouts.values()) {
        clearTimeout(timeoutId);
      }
      hideLoading();
    });
  } catch (error) {
    const recipients = getSelectedRecipients();
    for (const recipient of recipients) {
      const resultBox = createOrUpdateResultBox(recipient, "error");
      resultBox.textContent = `Error: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
    hideLoading();
  }
});
