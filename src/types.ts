export interface Root {
  jsonrpc: string;
  id: string;
  result: Result;
}

export interface Result {
  type: "success" | "error";
  data: Data;
}

export interface Data {
  responses: Response[];
  processor: Processor;
}

export type Response =
  | {
      status: "fulfilled";
      value: Value;
    }
  | {
      status: "rejected";
      reason: {
        url: string;
        reason: string;
      };
    };

export interface Value {
  responses: Response2[];
}

export type Response2 =
  | {
      status: "fulfilled";
      value: Value2;
    }
  | {
      status: "rejected";
      reason: {
        url: string;
        reason: string;
      };
    };

export interface Value2 {
  url: string;
  result: Result2;
}

export interface Result2 {
  result?: Result3;
  error: any;
  id?: string;
  protocol?: string;
  chain_id?: string;
  hash?: string;
  level?: number;
  proto?: number;
  predecessor?: string;
  timestamp?: string;
  validation_pass?: number;
  operations_hash?: string;
  fitness?: string[];
  context?: string;
  payload_hash?: string;
  payload_round?: number;
  proof_of_work_nonce?: string;
  liquidity_baking_toggle_vote?: string;
  adaptive_issuance_vote?: string;
  signature?: string;
}

export interface Result3 {
  feerate: number;
  blocks: number;
}

export interface Processor {
  timestamp: number;
  version: string;
  deploymentId: DeploymentId;
  deviceAddress: string;
}

export interface DeploymentId {
  origin: Origin;
  id: string;
}

export interface Origin {
  kind: string;
  source: string;
}
