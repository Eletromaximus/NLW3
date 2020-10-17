import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Mapview, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import { RectButton } from 'react-native-gesture-handler'
import api from '../services/api'

interface OrphanageItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap () {
  const [orphanages, setOrphanages] = useState<OrphanageItem[]>([])
  const navigation = useNavigation()

  function handleNavigateToOrphanageDetails (id: number) {
    navigation.navigate('OrphanageDetails', { id })
  }

  function handleNavigateToCreateOrphanage () {
    navigation.navigate('SelectMapPosition')
  }

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data)
    })
  })

  return (
    <View style={styles.container}>

      <Mapview
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -16.6302977,
          longitude: -49.327215,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
        }}>

        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}

              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}
            >

              <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>

                <View style={styles.calloutContainer}>

                  <Text style={styles.calloutText}> {orphanage.name} </Text>

                </View>

              </Callout>

            </Marker>
          )
        })}

      </Mapview>

      <View style={styles.footer}>

        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },

  calloutText: {
    color: '#0089a5',
    fontSize: 14,
    fontFamily: 'Nunito_700Bold'
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#FFF',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3

  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center'

  }

})
