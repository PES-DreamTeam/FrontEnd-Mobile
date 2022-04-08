import React from 'react';
import {
  Share,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import useAuth from '../hooks/useAuth';
import i18n from 'i18n-js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import files64 from '../../assets/filesBase64';

function CustomDrawer(props) {

  const TellAFriend = async () => {
    const shareOptions = {
      message: `${i18n.t('drawer.shareMessage')}`,
      url: files64.ecoRoadsLogo,
    }
    try {
      const shareResponse = await Share.share(shareOptions);
      //Sumar puntos por compartir
    } catch (error) {
      console.log(error);
    }
  }

  const { auth, signOut } = useAuth();

  const {user} = auth;

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#8200d6'}}>
        <ImageBackground
          source={require('../../assets/images/menu-bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={require('../../assets/images/user_profile.jpg')}
            style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {user?.nickname}
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity onPress={TellAFriend} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              {`${i18n.t('drawer.tellAFriend')}`}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
              onPress={() => signOut()}
              >
              {`${i18n.t('drawer.logOut')}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {CustomDrawer};