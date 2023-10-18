import { SetAlertDispatch, SetAlertSubscription } from "../Interfaces/Events/SetAlert";

interface EventMap {
  [eventType: string]: { [subscriberId: string]: (eventPayload: any) => void }
}

export type EventDispatch = SetAlertDispatch;
export type EventSubscription = (SetAlertSubscription) & { subscriberId: string };

const eventMap: EventMap = {};

const dispatch = ({eventType, eventPayload}: EventDispatch) => {
  if(!eventMap[eventType]) return ;

  const callbacks = Object.values(eventMap[eventType]);

  callbacks.forEach((callback) => callback(eventPayload));
};

const subscribe = ({eventType, subscriberId, onEvent}: EventSubscription) => {
  if(!eventMap[eventType]) { eventMap[eventType] = {} }

  eventMap[eventType][subscriberId] = onEvent;
};

export default { dispatch, subscribe }