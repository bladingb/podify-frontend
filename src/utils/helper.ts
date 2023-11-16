import { PermissionsAndroid, Platform } from "react-native"

export const getPermissionToAccessCamera = async () => {
    if(Platform.OS === 'android')
    PermissionsAndroid.PERMISSIONS.CAMERA
}