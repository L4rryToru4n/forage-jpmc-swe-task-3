import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = price_ABC / price_DEF;
    const upper_bound = 1 + 0.06;
    const lower_bound = 1 - 0.09;

    const timestamp_abc = serverResponds[0].timestamp;
    const timestamp_def = serverResponds[0].timestamp;
    
    let timestamp_final = undefined;
    
    if(timestamp_abc > timestamp_def) {
      timestamp_final = timestamp_abc;
    }
    else {
      timestamp_final = timestamp_def;
    }

    let trigger_alert = undefined;

    if(ratio > upper_bound || ratio < lower_bound) {
      trigger_alert = ratio;
    }
    else {
      trigger_alert = undefined;
    }
    
      return {
      price_abc: price_ABC,
      price_def: price_DEF,
      ratio,
      timestamp: timestamp_final,
      upper_bound: upper_bound,
      lower_bound: lower_bound,
      trigger_alert: trigger_alert
    };
  }
}
