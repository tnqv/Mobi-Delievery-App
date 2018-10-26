import { PermissionsAndroid } from 'react-native';

export async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'LDDS',
        'message': 'LDDS App muốn xin quyền truy cập địa điểm của bạn'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      // alert("");
    } else {
      console.log("location permission denied")
      // alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}