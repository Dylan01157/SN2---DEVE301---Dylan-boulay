import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DreamForm() {
    const [dreamText, setDreamText] = useState('');
    const [dreamType, setDreamType] = useState(null);
    const [dreamTone, setDreamTone] = useState(null); // New state for "Tonalité globale du rêve"
    const [hashtag1, setHashtag1] = useState('');
    const [hashtag2, setHashtag2] = useState('');
    const [hashtag3, setHashtag3] = useState('');
    const [emotionBefore, setEmotionBefore] = useState('');
    const [emotionAfter, setEmotionAfter] = useState('');
    const [characters, setCharacters] = useState('');
    const [location, setLocation] = useState('');
    const [emotionIntensity, setEmotionIntensity] = useState('');
    const [dreamClarity, setDreamClarity] = useState('');
    const [sleepQuality, setSleepQuality] = useState('');
    const [personalMeaning, setPersonalMeaning] = useState('');

    const handleDreamSubmission = async () => {
        try {
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];

            const hashtag1Id = await findHashtagIdByLabel(hashtag1);
            const hashtag2Id = await findHashtagIdByLabel(hashtag2);
            const hashtag3Id = await findHashtagIdByLabel(hashtag3);

            formDataArray.push({
                dreamText,
                dreamType,
                dreamTone,
                todayDate: new Date().toISOString(),
                hashtags: [
                    { id: hashtag1Id, label: hashtag1 },
                    { id: hashtag2Id, label: hashtag2 },
                    { id: hashtag3Id, label: hashtag3 },
                ],
                emotionBefore,
                emotionAfter,
                characters,
                location,
                emotionIntensity,
                dreamClarity,
                sleepQuality,
                personalMeaning,
            });

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

            console.log('AsyncStorage: ', await AsyncStorage.getItem('dreamFormDataArray'));
            // Réinitialiser les champs après la soumission
            setDreamText('');
            setDreamType(null);
            setDreamTone(null);
            setHashtag1('');
            setHashtag2('');
            setHashtag3('');
            setEmotionBefore('');
            setEmotionAfter('');
            setCharacters('');
            setLocation('');
            setEmotionIntensity('');
            setDreamClarity('');
            setSleepQuality('');
            setPersonalMeaning('');
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }
    };

    const handleClearDreams = async () => {
        try {
            await AsyncStorage.removeItem('dreamFormDataArray');
            console.log('Toutes les entrées de rêves ont été supprimées.');
        } catch (error) {
            console.error('Erreur lors de la suppression des données:', error);
        }
    };

    const findHashtagIdByLabel = async (hashtag) => {
        try {
            const existingDreams = await AsyncStorage.getItem('dreamFormDataArray');
            let dreamsData = existingDreams ? JSON.parse(existingDreams) : [];
            
            for (let dream of dreamsData) {
                for (let hashtagStored of dream.hashtags) {
                    if (hashtagStored.label === hashtag) {
                        return hashtagStored.id;
                    }
                }
            }

            const newId = `hashtag-${Math.random().toString(36).substr(2, 9)}`;
            return newId;
        } catch (error) {
            console.error('Erreur lors de la gestion des hashtags:', error);
            return null;
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <TextInput
                    label="Rêve"
                    value={dreamText}
                    onChangeText={setDreamText}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                
                <TextInput
                    label="État émotionnel avant le rêve"
                    value={emotionBefore}
                    onChangeText={setEmotionBefore}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="État émotionnel après le rêve"
                    value={emotionAfter}
                    onChangeText={setEmotionAfter}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Personnages présents dans le rêve"
                    value={characters}
                    onChangeText={setCharacters}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Lieu du rêve"
                    value={location}
                    onChangeText={setLocation}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Intensité émotionnelle"
                    value={emotionIntensity}
                    onChangeText={setEmotionIntensity}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Clarté du rêve"
                    value={dreamClarity}
                    onChangeText={setDreamClarity}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Qualité du sommeil ressentie"
                    value={sleepQuality}
                    onChangeText={setSleepQuality}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Signification personnelle du rêve"
                    value={personalMeaning}
                    onChangeText={setPersonalMeaning}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />

                <TextInput
                    label="Hashtag 1"
                    value={hashtag1}
                    onChangeText={setHashtag1}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Hashtag 2"
                    value={hashtag2}
                    onChangeText={setHashtag2}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />
                <TextInput
                    label="Hashtag 3"
                    value={hashtag3}
                    onChangeText={setHashtag3}
                    mode="outlined"
                    theme={{ colors: { text: '#800080' } }} // Texte violet
                    style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
                />

                {/* Zone pour le Type de rêve */}
                <Text style={styles.label}>Type de rêve</Text>
                <View style={styles.buttonFrame}>
                    <View style={styles.buttonContainer}>
                        {['Lucide', 'Récurrent', 'Cauchemar', 'Prémonitoire', 'Ordinaire'].map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[styles.dreamTypeButton, dreamType === type && styles.selectedButton]}
                                onPress={() => setDreamType(type)}
                            >
                                <Text style={styles.buttonText}>{type}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Zone pour la Tonalité globale du rêve */}
                <Text style={styles.label}>Tonalité globale du rêve</Text>
                <View style={styles.buttonFrame}>
                    <View style={styles.buttonContainer}>
                        {['Positive', 'Négative', 'Neutre'].map((tone) => (
                            <TouchableOpacity
                                key={tone}
                                style={[styles.dreamTypeButton, dreamTone === tone && styles.selectedButton]}
                                onPress={() => setDreamTone(tone)}
                            >
                                <Text style={styles.buttonText}>{tone}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleDreamSubmission}>
                    <Text style={styles.buttonText}>Soumettre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleClearDreams}>
                    <Text style={styles.buttonText}>Effacer tous les rêves</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 16,
        flexGrow: 1,
    },
    input: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,
        alignSelf: 'center',
        color: '#fff', // Titre en blanc
    },
    buttonFrame: {
        borderWidth: 1,
        borderColor: '#fff', // Couleur de la bordure
        borderRadius: 8,
        marginBottom: 16,
        padding: 8,
    },
    buttonContainer: {
        flexDirection: 'column',
        marginBottom: 16,
    },
    dreamTypeButton: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#d0bcff',
    },
    buttonText: {
        color: '#000', // Couleur du texte des boutons
        fontWeight: 'bold',
    },
    button: {
        padding: 12,
        backgroundColor: '#d0bcff',
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 8,
    },
});
