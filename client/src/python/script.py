'''
Python functions for creating and analyzing EEG waveforms

How to use:
Each time a new epoch is needed, call generate_data(args) to create an epoch. Then call 
generate_spectra() to create fft and power spectrum. All this data is stored internally
in this script.

Call get_data(), get_fft(), or get_power_spec() to get the graphs for the raw data, fft,
or power spectrum, respectively. All are in a list of [x, y] lists.

Call get_TBR_power(), get_TBR_amp(), or get_TBR_diff() to get the desired TBR from the
most recently created epoch
'''

import numpy as np
import js

# Global data variable to hold the most recent epoch
curr_data = []      # raw data
curr_data_sr = 0    # sampling rate
curr_data_ed = 0    # epoch duration
curr_fft = []       # fft spectrum
curr_powerspec = [] # power spectrum


# Creates a synthetic brain wave and stores it in global variable. Adapted from Python IV workshop
# params:
#   args.epochDuration: length of epoch in seconds
#   args.samplingRate:  number of samples per second
#   args.tFreq:     frequency of theta wave
#   args.tAmp:      amplitude of theta wave
#   args.tNoise:    amount of noise in theta wave
#   args.bFreq:     frequency of beta wave
#   args.bAmp:      amplitude of beta wave
#   args.bNoise:    amount of noise in beta wave
def generate_data():

    global curr_data, curr_data_sr, curr_data_ed

    args = js.window.pyArgs

    times = np.linspace(0,args.epochDuration,args.samplingRate) # One second at 250Hz
    theta = generateNoisyWave(times, args.tFreq, args.tAmp, args.tNoise) # (time, Freq, Amp, Noise)
    beta = generateNoisyWave(times, args.bFreq, args.bAmp, args.bNoise)

    xy_list = []

    for x in range(0, len(times)):
        xy_list.append([times[x], theta[x] + beta[x]])

    curr_data = xy_list
    curr_data_sr = args.samplingRate
    curr_data_ed = args.epochDuration

# Creates an fft and power spectra from the most recently generated epoch and stores them in global variables
def generate_spectra():

    global curr_data, curr_fft, curr_powerspec, curr_data_sr, curr_data_ed

    curr_fft = fft(curr_data, curr_data_sr, curr_data_ed)
    curr_powerspec = power_spec(curr_fft)

# Returns most recent raw data to JS
# returns list of [time, voltage] pairs
def get_data():

    global curr_data

    print(curr_data)

    return curr_data

# fft function for returning result to Javascript
# returns list of [frequency, amplitude] pairs corresponding to fourier spectrum
def get_fft():

    global curr_fft
    return curr_fft

# Power spectrum function for returning result to Javascript
# returns list of [frequency, amplitude] pairs corresponding to fourier spectrum
def get_power_spec():

    global curr_powerspec
    return curr_powerspec

# Calculates the theta-beta ratio (TBR) for the most recently stored epoch and returns to Javascript
# Calculation is mean theta power divided by mean beta power
# returns the TBR (power)
def get_TBR_power():

    global curr_powerspec

    theta_sum = 0
    theta_count = 0
    beta_sum = 0
    beta_count = 0

    for x in curr_powerspec:
        if x[0] <=7 and x[0] > 3.5:
            theta_sum += x[1]
            theta_count += 1
        elif x[0] <= 20 and x[0] > 12:
            beta_sum += x[1]
            beta_count += 1
    
    return ( (theta_sum / theta_count) / (beta_sum / beta_count) )

# Calculates the theta-beta ratio (TBR) for the most recently stored epoch and returns to Javascript
# Calculation is mean theta amplitude divided by mean beta amplitude
# returns the TBR (amplitude)
def get_TBR_amp():

    global curr_fft

    theta_sum = 0
    theta_count = 0
    beta_sum = 0
    beta_count = 0

    for x in curr_fft:
        if x[0] <=7 and x[0] > 3.5:
            theta_sum += x[1]
            theta_count += 1
        elif x[0] <= 20 and x[0] > 12:
            beta_sum += x[1]
            beta_count += 1
    
    return ( (theta_sum / theta_count) / (beta_sum / beta_count) )

# Calculates the theta-beta ratio (TBR) for the most recently stored epoch and returns to Javascript
# Calculation is normalized difference between theta power and beta powr
# (mean theta power - mean beta power) / (mean theta power + mean beta power)
# returns the TBR (difference)
def get_TBR_diff():

    global curr_powerspec

    theta_sum = 0
    theta_count = 0
    beta_sum = 0
    beta_count = 0

    for x in curr_powerspec:
        if x[0] <=7 and x[0] > 3.5:
            theta_sum += x[1]
            theta_count += 1
        elif x[0] <= 20 and x[0] > 12:
            beta_sum += x[1]
            beta_count += 1
    
    mean_theta = theta_sum / theta_count
    mean_beta = beta_sum / beta_count

    return (mean_theta - mean_beta) / (mean_theta + mean_beta)

# Creates a sine wave with added noise. Adapted from Python III workshop
# params:
#   times:  array of x-values for creating wave
#   freq:   frquency of wave
#   amp:    amplitude of wave
#   noise:  amount of noise introduced; higher means more noise
# returns: array of y-values corresponding to the specified sine wave
def generateNoisyWave(times, freq, amp, noise):
    
    # This simplifies code later, this basically just creates our noise for us
    if(not isinstance(times, float)):
        noiseArray = noise * np.random.randn(len(times))
    else:
        noiseArray = noise * np.random.randn(1)
    
    sineWave = amp * np.sin(freq * 2 * np.pi * times)
    return sineWave + noiseArray

# Creates a power spectrum from an epoch of EEG data.
# params:
#   fft:    list of [time, voltage] pairs corresponding to brain wave
# returns list of [frequency, power] pairs corresponding to fourier spectrum
def power_spec(fft):

    powerspec = []
    for x in fft:
        powerspec.append(x[0], x[1]**2)

    return powerspec
    
# Performs an FFT on an epoch of EEG data and stores it in the global variable
# params:
#   data:   list of [time, voltage] pairs corresponding to brain wave
#   samp_rate:      samples per second
#   epoch_length:   length of epoch in seconds
def fft(data, samp_rate, epoch_length):

    global curr_fft

    volts = [x[1] for x in data]

    n = len(volts)
    Y = np.fft.fft(volts)/n # fft computing and normalization
    Y = Y[:100 * epoch_length]
    k = np.arange(n)
    T = n*(epoch_length/samp_rate)
    frq = k/T # two sides frequency range
    frq = frq[:100 * epoch_length] # one side frequency range
    amp = np.abs(Y)

    xy_list = []
    for x in range(0, len(frq)):
        xy_list.append([frq[x], amp[x]])

    return xy_list
    