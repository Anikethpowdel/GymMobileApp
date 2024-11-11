import { Entypo, Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from "../contexts/AuthContext"; // Import useAuth for logout
const CustomDrawerContent = (props) => {
    const { navigation } = props;
    const { logout } = useAuth(); // Access logout from context

    const router = useRouter(); // Import useRouter for routing

    const handleLogout = async () => {
        try {
            await logout(); // Clear session data
            router.replace("/login");
            console.log("lgoo") // Redirect to the login screen
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    return ( 
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            {/* Close Button */}
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} style={styles.closeButton}>
                <MaterialCommunityIcons name="close-thick" size={28} color="black" />            
            </TouchableOpacity>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" size={80} color="#FFD700" />
                <Text style={styles.username}>Jimpa</Text>
                <Text style={styles.email}>02210227.cst@rub.edu.bt</Text>
                <TouchableOpacity 
                    style={styles.manageProfileButton}
                    onPress={() => navigation.dispatch(DrawerActions.jumpTo("screens/manageProfile"))}
                >
                    <Text style={styles.manageProfileText}>Manage Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Drawer Options */}
            <View style={styles.menuContainer}>
                <DrawerItem
                    label="About Us"
                    onPress={() => navigation.navigate('(tabs)', { screen: 'aboutUs' })}
                    icon={() => <Entypo name="info-with-circle" size={24} color="black" />}
                    labelStyle={styles.menuItemLabel}
                />
                <View style={styles.logoutContainer}>
                    <DrawerItem
                        label="Log Out"
                        onPress={handleLogout} // Call the handleLogout function
                        icon={() => <MaterialCommunityIcons name="logout" size={24} color="black" />}
                        labelStyle={styles.menuItemLabel}
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    closeButton: {
        alignSelf: "flex-start",
        margin: 20,
    },
    profileContainer: {
        alignItems: "center",
        margin: 10,
        padding: 20,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
    },
    email: {
        fontSize: 14,
        color: "gray",
        marginBottom: 10,
    },
    manageProfileButton: {
        backgroundColor: "#FFD700",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
        marginTop: 10,
    },
    manageProfileText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
    },
    menuContainer: {
        paddingTop: 20,
        paddingLeft: 10,
    },
    menuItemLabel: {
        fontSize: 17,
        fontWeight: "500",
        color: "#333333",
    },
    logoutContainer: {
        justifyContent: 'flex-end',
        borderTopColor: "#E0E0E0",
        marginTop: 10,
    },
});
