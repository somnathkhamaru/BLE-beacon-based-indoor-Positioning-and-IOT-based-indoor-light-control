# BLE-beacon-based-indoor-Positioning-and-IOT-based-indoor-light-control
BLE beacon based indoor Positioning and IOT based indoor light control


Indoor positioning technology is becoming commercially available in various forms. Positioning system till early 2000's was mainly based on GPS. But GPS is not a very viable solution for indoor navigation and positioning. GPS accuracy can be about 3-5 meters but indoor positioning should have accuracy of less than 1 meter. RFID technology could also be used for indoor positioning but this technology is passive and it cannot deliberately position an object unless the object deliberately comes in its field. 
We might ask ourselves why we would even need a positioning system indoor. The answer lies within big buildings where some may spend enormous amount of time finding what they are looking for. Shopping centres, airports and museums are just some organizations where indoor positioning would bring great benefit to people. Can you just imagine that everybody would have an indoor map marked with their current position on a mobile phone? This would definitely revolutionise navigation indoor.
So we have chosen the latest BLE technology for indoor navigation, this technology is active and it advertises the locators (BLE) position and the locatee (user) needs to calculate its position with respect to the BLE. It’s somewhat like the old milestone that we get in highways.

BLE advertises its uuid (unique id )  and position at particular intervals . When any smartphone u picks up that advertisement then it gets the distance of the smartphone user   from the BLE by calculating the received power level from the BLE.
A BLE is attached to any physical object, so the smartphone user gets to know about the object from the server by querying on the BLE uuid and physical object content related to the UUID.
In our project we are using this BLE based indoor positioning system to locate different labs in the college building. This helps a new person in college to locate any lab and get some basic information about the lab on the go. We will be using iBeacons for indoor positions. iBeacons are programmed from ESP -32 IC. 
The user needs to install our IoT app and keep the Bluetooth connection on, while moving inside the campus. The app also has a special feature to control indoor lighting according to user's position. So this eco-friendly app will also save electricity on the go.
