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

export function runCallbacks(event: Event, ...callbacks: Array<string|null|"">) {
  callbacks
    .filter(callback => !!callback && callback != "")
    .map(callback => callback.split(";"))
    .reduce((acc, callbacks) => acc = [...acc, ...callbacks])
    .forEach(callback => {
      try {
        new Function(callback).call(null, callback.includes("$event") ? event : null);
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

export function anyValidCallback(...callbacks: Array<string|null|"">) {
  const validStrings = callbacks.filter(callback => !!callback && callback !== "");
  if (validStrings.length === 0) {
    return false;
  }

  return _.some(
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