import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

class JellyFish extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Svg
          enable-background="new 0 0 512 512"
          height={this.props.size || 45}
          viewBox="0 0 512 512"
          width={this.props.size || 45}
          fill={this.props.fill || 'white'}
        >
          <Path d="m462.613 185.203c-5.396-49.645-28.417-95.504-65.243-129.703-38.537-35.79-88.744-55.5-141.37-55.5s-102.833 19.71-141.371 55.5c-36.825 34.199-59.846 80.058-65.243 129.703-9.972 2.731-17.322 11.874-17.322 22.701 0 12.976 10.557 23.532 23.532 23.532h16.548v17.253c0 7.439 5.458 13.866 12.978 15.282 5.057.952 8.185 3.228 12.146 6.11 3.067 2.231 6.543 4.745 11.125 6.622-1.017 2.385-2.162 4.619-3.348 6.916-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.462 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509 0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-13.714 3.328-20.164 7.181-27.631 4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.462-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.62 1.742-3.374 3.519-6.843 5.034-10.974.105.001.203.008.308.008 13.458 0 20.661-5.241 26.448-9.452 3.164-2.302 5.913-4.301 9.632-5.474-1.082 8.197-3.712 13.313-6.654 19.013-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.461 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509 0 15.973 3.94 24.96 8.329 33.498 1.33 2.587 3.955 4.072 6.677 4.072 1.154 0 2.326-.268 3.423-.831 3.684-1.895 5.135-6.416 3.241-10.1-3.279-6.378-6.67-12.974-6.67-26.64 0-13.714 3.328-20.164 7.181-27.631 4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.462-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.62 3.425-6.634 7.219-14.013 8.442-26.14 4.166 1.124 7.094 3.246 10.497 5.722 4.48 3.259 9.823 7.125 18.244 8.71-.765 1.627-1.582 3.211-2.416 4.828-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.462 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509s4.702 26.469 8.851 34.51c2.191 4.246 4.26 8.257 5.592 13.456.868 3.388 3.917 5.641 7.26 5.641.616 0 1.242-.076 1.866-.236 4.013-1.028 6.433-5.114 5.405-9.127-1.753-6.845-4.315-11.81-6.793-16.612-3.854-7.467-7.181-13.917-7.181-27.631s3.328-20.164 7.181-27.631c4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.461-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.619 1.84-3.565 3.725-7.223 5.292-11.671 8.54-1.56 13.934-5.462 18.452-8.747 5.055-3.677 9.048-6.582 17.63-6.582.062 0 .118.004.18.004-.984 8.851-3.709 14.152-6.787 20.115-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.462 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509s4.702 26.47 8.851 34.51c3.854 7.468 7.181 13.917 7.181 27.632 0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5c0-17.356-4.702-26.47-8.851-34.51-3.854-7.468-7.181-13.917-7.181-27.632s3.328-20.164 7.181-27.631c4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.462-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.62 3.062-5.931 6.429-12.482 7.979-22.49.959.65 1.917 1.344 2.915 2.071 5.712 4.157 12.815 9.308 25.939 9.44-.663 1.373-1.356 2.725-2.065 4.099-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.462 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509 0 17.357 4.703 26.47 8.851 34.51 2.184 4.233 4.247 8.231 5.579 13.404.872 3.385 3.917 5.632 7.258 5.632.619 0 1.249-.077 1.875-.239 4.011-1.032 6.426-5.122 5.393-9.133-1.753-6.81-4.307-11.757-6.775-16.542-3.853-7.468-7.181-13.917-7.181-27.632 0-13.714 3.328-20.164 7.181-27.631 4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.461-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.619 2.216-4.294 4.496-8.729 6.208-14.513 3.791-1.773 6.8-3.947 9.492-5.905 5.058-3.677 9.052-6.582 17.638-6.582 3.249 0 5.839.416 8.08 1.131-1.085 8.196-3.674 13.222-6.651 18.987-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.461 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509 0 17.355 4.701 26.466 8.848 34.504 1.332 2.582 3.954 4.063 6.671 4.063 1.158 0 2.333-.27 3.433-.837 3.681-1.899 5.125-6.423 3.226-10.104-3.852-7.465-7.178-13.913-7.178-27.626 0-13.714 3.328-20.164 7.181-27.631 4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.462-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.62 2.506-4.855 5.261-10.195 7.019-17.533 5.183 3.392 11.867 6.566 22.35 6.566 2.866 0 5.434-.248 7.78-.662-.746 1.577-1.546 3.131-2.381 4.749-4.149 8.038-8.852 17.148-8.852 34.5 0 17.347 4.703 26.455 8.852 34.49 3.853 7.462 7.18 13.906 7.18 27.608 0 13.714-3.328 20.164-7.181 27.632-4.149 8.04-8.851 17.153-8.851 34.509 0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5c0-13.714 3.328-20.164 7.181-27.631 4.149-8.04 8.851-17.153 8.851-34.51 0-17.347-4.703-26.455-8.852-34.49-3.853-7.462-7.18-13.906-7.18-27.608 0-13.708 3.328-20.155 7.181-27.619 2.799-5.423 5.94-11.52 7.615-20.322.043-.031.087-.063.13-.094 3.968-2.883 7.103-5.161 12.172-6.113 7.523-1.413 12.983-7.84 12.983-15.283v-17.252h16.548c12.976 0 23.532-10.557 23.532-23.532.003-10.828-7.348-19.97-17.32-22.701zm-6.21 31.233h-64.129c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5h32.581v17.252c0 .216-.344.464-.751.541-8.388 1.575-13.612 5.372-18.221 8.721-5.062 3.678-9.061 6.583-17.655 6.583s-12.593-2.905-17.655-6.583c-5.793-4.209-13.003-9.449-26.473-9.449-13.463 0-20.669 5.24-26.459 9.45-5.058 3.677-9.052 6.582-17.638 6.582-8.575 0-12.565-2.904-17.617-6.58-5.786-4.211-12.988-9.452-26.442-9.452-13.46 0-20.665 5.24-26.454 9.451-5.055 3.677-9.048 6.582-17.63 6.582-8.578 0-12.57-2.904-17.623-6.581-5.778-4.203-12.967-9.432-26.38-9.45-.011 0-.022-.002-.033-.002-.004 0-.008.001-.012.001-.008 0-.016-.001-.024-.001-13.457 0-20.66 5.241-26.448 9.451-5.053 3.677-9.045 6.581-17.623 6.581s-12.57-2.904-17.623-6.581c-4.603-3.349-9.82-7.145-18.195-8.722-.408-.077-.753-.325-.753-.541v-17.253h273.064c4.142 0 7.5-3.358 7.5-7.5s-3.358-7.5-7.5-7.5h-304.613c-4.705 0-8.532-3.828-8.532-8.532s3.828-8.532 8.532-8.532h.696c3.913 0 7.167-3.007 7.477-6.908 3.82-48.211 25.508-92.949 61.068-125.973 35.753-33.204 82.334-51.491 131.162-51.491s95.409 18.287 131.163 51.491c35.56 33.024 57.248 77.762 61.068 125.973.309 3.9 3.564 6.908 7.477 6.908h.696c4.705 0 8.532 3.828 8.532 8.532s-3.828 8.532-8.533 8.532z" />
          <Path d="m229.065 112.453c-4.011 1.034-6.424 5.124-5.389 9.135.515 1.995.775 4.066.775 6.154 0 13.545-11.02 24.565-24.564 24.565s-24.564-11.02-24.564-24.565 11.02-24.564 24.564-24.564c2.085 0 4.154.26 6.149.774 4.012 1.031 8.101-1.381 9.134-5.393 1.033-4.011-1.381-8.101-5.393-9.134-3.216-.828-6.544-1.248-9.89-1.248-21.816 0-39.564 17.749-39.564 39.564 0 21.816 17.749 39.565 39.564 39.565s39.564-17.749 39.564-39.565c0-3.351-.421-6.682-1.251-9.9-1.033-4.01-5.125-6.424-9.135-5.388z" />
          <Path d="m311.597 71.629c0-12.976-10.557-23.532-23.532-23.532s-23.532 10.557-23.532 23.532 10.557 23.532 23.532 23.532 23.532-10.557 23.532-23.532zm-23.533 8.532c-4.705 0-8.532-3.828-8.532-8.532s3.828-8.532 8.532-8.532 8.532 3.828 8.532 8.532-3.827 8.532-8.532 8.532z" />
          <Path d="m332.153 112.226c-15.186 0-27.541 12.354-27.541 27.541s12.354 27.541 27.541 27.541c15.186 0 27.54-12.354 27.54-27.541s-12.354-27.541-27.54-27.541zm0 40.081c-6.915 0-12.541-5.625-12.541-12.541s5.625-12.541 12.541-12.541c6.915 0 12.54 5.625 12.54 12.541s-5.625 12.541-12.54 12.541z" />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default JellyFish;
