import * as _ from "lodash";

export function runFirstCallback(event: Event, ...callbacks: Array<string|null|"">) {
  callbacks
    .find(callback => !!callback && callback !== "")
    .split(";")
    .forEach(callback => {
      try {
        callback.includes("$event")
          ? new Function("$event", callback)(event)
          : new Function("{ return " + callback + " };").call(null);
      } catch (e) {
        console.error(`Calling ${callback} on ${event.type} ${event.target} has been crashed`);
        console.error(e);
      }
    });
}

export function allValidCallbacks(...callbacks: Array<string|null|"">) {
  const validStrings = callbacks.filter(callback => !!callback && callback !== "");
  if (validStrings.length === 0) {
    return false;
  }

  return _.every(
    validStrings
      .map(callback => _.every(
        callback
          .split(";")
          .map(callback => {try {return !!(new Function(callback));} catch (e) {return false;}})
        )
      ),
    Boolean
  );
}