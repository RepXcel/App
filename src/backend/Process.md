App Processes

## Calibration
1. User clicks on calibration button
   1. Start Listening to Characteristic
   2. If value == previous value, discard (can't handle same value)
   3. If value is new, then add to array with increasing rep #
2. User clicks on stop calibration
   1. Stop listening to Characteristic
   2. Find max and min of stored value, set current user rpe0 and rpe10 to those


## Tracking Session
1. User clicks on start session
2. Process on App:
   1. Start Listening to Characteristic
   2. If value == previous value, discard
   3. If value is new, then add to array with increasing rep #
3. User clicks on stop session
   1. Stop listening to Characteristic
   2. Look at last 3 reps, then find min
   3. Do a linear interpolation with slowest velocity and return RPE (rounded to the closest value with 10 being max)


Async Storage: Store current user's username to find them in Datastore