const float BELT_LENGTH = 3.44;
const int SENSOR_PIN = A0;
int LIMIT_LIGHT = 2000;
int LIMIT_DARK = 0;

int lower_dark = 2000;
int upper_dark = 0;
bool tracking = false;
bool over_mark = false;

float distance = 0;
int brightness = 0;
int mark_counter = 0;

int val = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
  Serial.println("Arduino is starting ...");
  distance = 0;
  mark_counter = 0;
  tracking = false;
  over_mark = false;

  Serial.println("Check that Sensor is over black part of the Belt");
  for (int i = 5; i > 0; i--)
  {
    Serial.println(i);
    delay(1000);
  }
  Serial.println("Start Sensor calibration for 5 seconds");
  int start_millis = millis();
  int current_millis = millis();
  while(current_millis - start_millis < 5000){
    brightness = analogRead(SENSOR_PIN);
    if(brightness < lower_dark){
      lower_dark = brightness;
    } else if( brightness > upper_dark){
      upper_dark = brightness;
    } 
    current_millis = millis();
  }
  LIMIT_DARK = (lower_dark + upper_dark) / 2;
  LIMIT_LIGHT = LIMIT_DARK - 75;
  Serial.println("lower brightness boundary for dark belt: " + String(lower_dark));
  Serial.println("upper brightness boundary for dark belt: " + String(upper_dark));
  Serial.println("LIMIT_DARK: " + String(LIMIT_DARK));
  Serial.println("LIMIT_LIGHT: " + String(LIMIT_LIGHT));
  Serial.println("Arduino setup complete");
}

void loop() {
  // put your main code here, to run repeatedly:
  if (Serial.available() > 0){
    String incoming = Serial.readStringUntil('\n');
    incoming.trim();
    Serial.println(incoming);

    if(incoming == "START"){
      Serial.println("received START command");
      startTracking();
    }

    if(incoming == "STOP" && tracking){
      Serial.println("received STOP command");
      stopTracking();
    }
  }

  if (tracking){

    brightness = analogRead(SENSOR_PIN);
    //Serial.println(brightness);
    if(brightness > LIMIT_DARK && over_mark){
      over_mark = false;
      //Serial.println(brightness);
    } else if (brightness <= LIMIT_LIGHT && !over_mark){
      //Serial.println(brightness);
      Serial.println("Markierung passiert");
      over_mark = true;
      mark_counter += 1;
      distance = mark_counter * BELT_LENGTH;
      Serial.println("DISTANCE " + String(distance));
    }
    
  }
}

void startTracking(){
  distance = 0;
  mark_counter = 0;
  tracking = true;
  //Serial.println("Current Brightness: " + String(brightness));

}

void stopTracking(){
  tracking = false;
  Serial.println("END " + String(distance));

}