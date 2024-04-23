export interface Connection {
    "info": {
        "day": Date,
        "connectionType": string,
        "lineName": string,
        "description": string[],
        "origin": string,
        "destination": string,
        "transportType": string,
        "operator": string,
    },
    "previousStops": string[],
    "thisStop": {
        "name": string,
        "quay": string,
        "departureTime": Date,
        "arrivalTime": Date
    },
    "onwardStops": string[]
}