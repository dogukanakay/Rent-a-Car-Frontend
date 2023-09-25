import { inject } from '@angular/core';
import { CanDeactivateFn, Router } from '@angular/router';

export const pageTransitionGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  
  window.onbeforeunload
  return true;
};
