import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const ProfileSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ProfileButton = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.profileButton} onPress={onPress}>
    <View style={styles.buttonContent}>
      <Text style={styles.buttonIcon}>{icon}</Text>
      <View style={styles.buttonTextContainer}>
        <Text style={styles.buttonTitle}>{title}</Text>
        {subtitle && <Text style={styles.buttonSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const ProfileScreen = () => {
  const handleLogout = () => {
    // Add logout logic here
    alert('Logout functionality to be implemented');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>Bishal Datta</Text>
          <Text style={styles.email}>dattabishal001@gmail.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <ProfileSection title="Account">
          <ProfileButton
            icon="👤"
            title="Personal Information"
            subtitle="Name, Email, Phone"
            onPress={() => alert('Personal Info')}
          />
          <ProfileButton
            icon="🔒"
            title="Security"
            subtitle="Password, 2FA"
            onPress={() => alert('Security')}
          />
          <ProfileButton
            icon="🏷️"
            title="My Orders"
            subtitle="Order history, Tracking"
            onPress={() => alert('Orders')}
          />
        </ProfileSection>

        {/* Preferences Section */}
        <ProfileSection title="Preferences">
          <ProfileButton
            icon="🌙"
            title="Appearance"
            subtitle="Dark mode, Theme"
            onPress={() => alert('Appearance')}
          />
          <ProfileButton
            icon="🔔"
            title="Notifications"
            subtitle="Email, Push notifications"
            onPress={() => alert('Notifications')}
          />
          <ProfileButton
            icon="🌍"
            title="Language"
            subtitle="English (US)"
            onPress={() => alert('Language')}
          />
        </ProfileSection>

        {/* Help Section */}
        <ProfileSection title="Help & Support">
          <ProfileButton
            icon="❓"
            title="FAQ"
            subtitle="Frequently asked questions"
            onPress={() => alert('FAQ')}
          />
          <ProfileButton
            icon="📞"
            title="Contact Us"
            subtitle="Get help with your account"
            onPress={() => alert('Contact')}
          />
          <ProfileButton
            icon="📜"
            title="Terms & Privacy"
            subtitle="Legal information"
            onPress={() => alert('Terms')}
          />
        </ProfileSection>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#666',
  },
  logoutButton: {
    margin: 24,
    padding: 16,
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginBottom: 24,
  },
});

export default ProfileScreen;