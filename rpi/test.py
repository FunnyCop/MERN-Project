import time
import requests

# CircuitPython Modules
import board
import busio

# Adafruit ADS1115 Modules
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from adafruit_ads1x15.ads1115 import Mode

# Create the I2C Bus
i2c = busio.I2C( board.SCL, board.SDA )

# Create the ADS1115 Device
ads = ADS.ADS1115( i2c )

# Set Mode to Continuous
ads.mode = Mode.CONTINUOUS

# Create Channels for Measuring Input Voltage
channels = [
    AnalogIn( ads, ADS.P0 ), # Pin A0 -- 100k ohm pot
    AnalogIn( ads, ADS.P1 ), # Pin A1 -- momentary switch
    AnalogIn( ads, ADS.P2 ), # Pin A2 -- 1st switch state
    AnalogIn( ads, ADS.P3 )  # Pin A3 -- 2nd switch state
]

old = 0

# Loop for Reading Input
while True:
    rotation = 0

    if channels[ 0 ].voltage <= 0.01:
        rotation = 0
    elif channels[ 0 ].voltage >= 3.157:
        rotation = 360
    else:
        rotation = round( ( channels[ 0 ].voltage - 0.01 ) * ( 114 + ( 414 / 1049 ) ), 5 )

    if rotation > ( old + 0.25 ) or rotation < ( old - 0.25 ):
        old = rotation
        rotation = f"{ rotation }deg"

    elif rotation > 2 and ( rotation > ( old + 0.255 ) or rotation < ( old - 0.255 ) ):
        old = rotation
        rotation = f"{ rotation }deg"

    else:
        rotation = f"{ old }deg"

    # Print the Voltage from Pin A0
    requests.post( "http://192.168.1.2:3001/rotation", json = { "rotation": rotation } )

    time.sleep( 0.05 )