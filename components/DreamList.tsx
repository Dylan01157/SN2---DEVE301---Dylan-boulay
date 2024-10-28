import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function DreamList() {
    const [dreams, setDreams] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDream, setSelectedDream] = useState(null);

    const fetchData = async () => {
        try {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamFormDataArray = data ? JSON.parse(data) : [];
            setDreams(dreamFormDataArray);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    // useEffect pour charger les données au montage du composant
    useEffect(() => {
        fetchData();
    }, []);

    // useFocusEffect est déclenché chaque fois que la route est focalisée
    useFocusEffect(
        useCallback(() => {
            fetchData();
            return () => {
                console.log('This route is now unfocused.');
            };
        }, [])
    );

    // Ouvrir le modal d'édition
    const openEditModal = (dream) => {
        setSelectedDream(dream);
        setModalVisible(true);
    };

    // Sauvegarder les modifications
    const handleSave = async () => {
        if (!selectedDream) return;

        try {
            const existingDreams = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamFormDataArray = existingDreams ? JSON.parse(existingDreams) : [];
            
            // Mettre à jour le rêve modifié
            const index = dreamFormDataArray.findIndex(d => d.todayDate === selectedDream.todayDate);
            if (index !== -1) {
                dreamFormDataArray[index] = { ...selectedDream }; // Garder le reste des informations
                await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(dreamFormDataArray));
            }
            setModalVisible(false);
            fetchData(); // Recharger les rêves
        } catch (error) {
            console.error('Erreur lors de la mise à jour des données:', error);
        }
    };

    // Gérer les changements dans les champs de texte
    const handleInputChange = (field, value) => {
        setSelectedDream({ ...selectedDream, [field]: value });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {dreams.map((dream, index) => (
                    <TouchableOpacity key={index} onPress={() => openEditModal(dream)}>
                        <View style={styles.dreamCard}>
                            <Text style={styles.dreamText}>
                                {dream.dreamText} - Type: {dream.dreamType ? dream.dreamType.charAt(0).toUpperCase() + dream.dreamType.slice(1) : 'Non spécifié'} - 
                                Tonalité: {dream.dreamTone ? dream.dreamTone.charAt(0).toUpperCase() + dream.dreamTone.slice(1) : 'Non spécifié'} - {new Date(dream.todayDate).toLocaleDateString()}
                            </Text>
                            <Text style={styles.detailText}>Émotions avant le rêve: {dream.emotionBefore}</Text>
                            <Text style={styles.detailText}>Émotions après le rêve: {dream.emotionAfter}</Text>
                            <Text style={styles.detailText}>Personnages présents: {dream.characters}</Text>
                            <Text style={styles.detailText}>Lieu du rêve: {dream.location}</Text>
                            <Text style={styles.detailText}>Intensité émotionnelle: {dream.emotionIntensity}</Text>
                            <Text style={styles.detailText}>Clarté du rêve: {dream.dreamClarity}</Text>
                            <Text style={styles.detailText}>Qualité du sommeil ressentie: {dream.sleepQuality}</Text>
                            <Text style={styles.detailText}>Signification personnelle: {dream.personalMeaning}</Text>
                            <Text style={styles.hashtagsText}>Hashtags:</Text>
                            {dream.hashtags && dream.hashtags.map((hashtag, idx) => (
                                <Text key={idx} style={styles.hashtagItem}>
                                    {idx + 1}. {hashtag.id} - {hashtag.label}
                                </Text>
                            ))}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal pour modifier le rêve */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Modifier le rêve</Text>
                    
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.dreamText}
                        onChangeText={(value) => handleInputChange('dreamText', value)}
                        placeholder="Texte du rêve"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.dreamType}
                        onChangeText={(value) => handleInputChange('dreamType', value)}
                        placeholder="Type de rêve (ex: cauchemar, rêve lucide)"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.emotionBefore}
                        onChangeText={(value) => handleInputChange('emotionBefore', value)}
                        placeholder="État émotionnel avant le rêve"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.emotionAfter}
                        onChangeText={(value) => handleInputChange('emotionAfter', value)}
                        placeholder="État émotionnel après le rêve"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.characters}
                        onChangeText={(value) => handleInputChange('characters', value)}
                        placeholder="Personnages présents"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.location}
                        onChangeText={(value) => handleInputChange('location', value)}
                        placeholder="Lieu du rêve"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.emotionIntensity}
                        onChangeText={(value) => handleInputChange('emotionIntensity', value)}
                        placeholder="Intensité émotionnelle"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.dreamClarity}
                        onChangeText={(value) => handleInputChange('dreamClarity', value)}
                        placeholder="Clarté du rêve"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.sleepQuality}
                        onChangeText={(value) => handleInputChange('sleepQuality', value)}
                        placeholder="Qualité du sommeil ressentie"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.personalMeaning}
                        onChangeText={(value) => handleInputChange('personalMeaning', value)}
                        placeholder="Signification personnelle"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.dreamTone}
                        onChangeText={(value) => handleInputChange('dreamTone', value)}
                        placeholder="Tonalité globale (positive, négative, neutre)"
                    />
                    <TextInput
                        style={styles.input}
                        value={selectedDream?.hashtags ? selectedDream.hashtags.map(hashtag => hashtag.label).join(', ') : ''}
                        onChangeText={(value) => handleInputChange('hashtags', value.split(',').map(tag => ({ id: tag.trim(), label: tag.trim() })))}
                        placeholder="Tags ou Mots-clés associés (séparés par des virgules)"
                    />
                    
                    <Button title="Enregistrer" onPress={handleSave} />
                    <Button title="Annuler" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    scrollView: {
        paddingLeft: 16,
    },
    dreamCard: {
        backgroundColor: '#d1c4e9', // Couleur de fond des cartes
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    dreamText: {
        fontSize: 16,
        marginBottom: 4,
        color: '#5e35b1', // Couleur du texte
    },
    detailText: {
        fontSize: 14,
        color: '#5e35b1', // Couleur du texte
    },
    hashtagsText: {
        fontWeight: 'bold',
        color: '#5e35b1', // Couleur du texte
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 16,
        color: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 10,
        marginBottom: 12,
        width: '80%',
        backgroundColor: '#fff',
    },
});
