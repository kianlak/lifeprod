export interface SetAlertDispatch {
  eventType: 'set-alert',
  eventPayload: {
    alertType: 'error' | 'warning' | 'success',
    alertMessage: string
  }
}

export interface SetAlertSubscription {
  eventType: SetAlertDispatch['eventType'],
  onEvent: (payload: SetAlertDispatch['eventPayload']) => void
}