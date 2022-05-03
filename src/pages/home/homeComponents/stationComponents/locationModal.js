import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../../../utils/button';
import i18n from 'i18n-js';
import useAuth from "../../../../hooks/useAuth";
import useUser from "../../../../hooks/useUser";
import useChargePoints from "../../../../hooks/useChargePoints";
import GenericLocationInfo from './genericLocationInfo';

export default (props) => {

    const { auth, setAuth } = useAuth();
    const { sendFavourite } = useUser();
    const { getChargePointInfo, sendStationLike } = useChargePoints();

    const [isLiked, toggleLiked] = useState();
    const [isFavourite, toggleFavourite] = useState();
    const [stationLikes, setStationLikes] = useState();
    const [stationReports, setStationReports] = useState();
    const [showStationReports, setShowStationReports] = useState();

    useEffect(async () => {
        if (props.stationInfo != null) {
          let info = await getChargePointInfo(props?.stationInfo?.id);
          setStationLikes(info.likes);
          setStationReports(info.reports);
          
        } 
      }, [props]);
    
    useEffect(() => {
        if (props.stationInfo != null) {
            console.log(props?.stationInfo?.id);
            console.log(auth?.user?.likes);
            console.log(auth?.user?.likes?.includes(props?.stationInfo?.id?.toString()));
            toggleFavourite(
                auth?.user?.favourites?.includes(props?.stationInfo?.id?.toString())
            );
            toggleLiked(
                auth?.user?.likes?.includes(props?.stationInfo?.id.toString())
            );
        }
    }, [props.stationInfo?.id]);

    const handleFavourite = async () => {
        const user = await sendFavourite(props.stationInfo.id);
        toggleFavourite(!isFavourite);
        setAuth({
            ...auth,
            user: user,
        });
    };

    const handleLike = async () => {
        const likes = await sendStationLike(props.stationInfo.id);
        toggleLiked(!isLiked);

        setAuth({
            ...auth,
            user: {
            ...auth.user,
            likes,
            },
        });
    };
    

    /*
<Text style={{ color: "#1D69A6" }}>{stationLikes} Likes</Text> 
        {stationReports >= 2?<Text style={{ color: "#1D69A6" }}>{stationReports} Reports</Text> : null}
    */
    return(
        <Modal isVisible={props.isVisible}>
            <View style={styles.modal}>
                <View style={styles.modalHeader}>
                    <View style={styles.modalTitle}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            {props?.stationInfo?.name}
                        </Text>
                    </View>
                    <View style={styles.favButtonContainer}>
                        <Pressable
                            onPress={handleFavourite}
                            style={styles.favouriteButton}
                        >
                            <Image
                                source={
                                isFavourite
                                    ? require("../../../../../assets/images/favourite.png")
                                    : require("../../../../../assets/images/blank-favourite.png")
                                }
                                style={styles.favIcon}
                            />
                        </Pressable>
                    </View>
                </View>
                <View style={styles.modalBody}>
                    <View style={styles.modalSubtitle}>
                        <Text style={{fontSize: 15}}>
                            {props?.stationInfo?.address}
                        </Text>
                    </View>  
                    <View style={styles.locationInfo}>
                        <GenericLocationInfo
                            stationInfo={props?.stationInfo}
                        />
                    </View>
                    <View style={styles.extraInfo}>
                        <View style={styles.likesInfoContainer}>
                            <View style={styles.likeButtonContainer}>
                                <Pressable onPress={handleLike} style={styles.likeButton}>
                                    <Image
                                        source={
                                        isLiked
                                            ? require("../../../../../assets/images/like.png")
                                            : require("../../../../../assets/images/blank-like.png")
                                        }
                                        style={styles.likeIcon}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.likesInfo}>
                                <Text style={{ color: "#1D69A6" }}>{stationLikes} {i18n.t('locationInfo.likesNumber')}</Text> 
                            </View>
                        </View>
                        <View style={styles.reportsInfoContainer}>
                            <View style={styles.reportButtonContainer}>
                                <CustomButton
                                    customStyles={styles.reportButton}
                                    onPress={props.handleReport}
                                    imageSrc={require("../../../../../assets/images/icons/flag.png")}
                                    imageWidth={20}
                                    imageHeight={20}
                                />
                            </View>
                            <View styles={styles.reportsInfo}>
                                <Text style={{ color: "#1D69A6" }}>{stationReports} {i18n.t('locationInfo.reportsNumber')}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.modalButtons}>                    
                    <CustomButton
                        customStyles={styles.cancelButton}
                        onPress={props.handleClose}
                        text={i18n.t('miscelaneus.exit')}
                    />
                </View>
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto',
        borderRadius: 20,
        padding: 20,
        // backgroundColor: 'red'
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
    },
    modalTitle:{
        width: '90%'
        //alignItems: 'center',
        //justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    locationInfo: {
        width: '100%',
    },
    favButtonContainer: {
        display: "flex",
        height: 40,
        width: "10%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    modalBody: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },

    modalSubtitle:{
       // alignItems: 'center',
        // backgroundColor: 'yellow'
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40,
        // backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
        width: "45%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    favIcon: {
        height: 36,
        width: 36,
    },
    likeIcon: {
        height: 36,
        width: 36,
    },

    extraInfo: {
        width: '100%',
        height: 60,
        marginTop: 20,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },

    likesInfoContainer: {
        alignItems: 'center',
        width:'45%',
    },
    likesInfo: {
        textAlign: 'center',
    },
    likeButtonContainer: {

    },
    likeButton: {

    },
    reportsInfoContainer: {
        width: '45%',
        alignItems: 'center',
    },
    reportButtonContainer: {

    },
    reportButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
})
