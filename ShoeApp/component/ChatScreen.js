import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { getDatabase, ref, onValue, off, set, push } from 'firebase/database';
import firebase from '../config/FirebaseConfig';

const ChatScreen = ({ route }) => {
    const { userId, userName } = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const database = getDatabase(firebase);
        const chatRef = ref(database, `chats`);

        onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const messageList = Object.values(data).sort((a, b) => a.timestamp - b.timestamp);
                setMessages(messageList);
            } else {
                setMessages([]);
            }
        });

        return () => {
            off(chatRef);
        }
    }, []);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            const database = getDatabase(firebase);
            const chatRef = ref(database, `chats`);
            const newMessageRef = push(chatRef);

            set(newMessageRef, {
                sender: userId,
                name: userName,
                content: message,
                timestamp: Date.now(),
            })
                .then(() => {
                    setMessage('');
                })
                .catch((error) => {
                    console.log('Lỗi chat', error);
                });
        }
    };

    const renderItem = ({ item }) => {
        const isCurrentUser = item.sender === userId;
        const messageStyle = isCurrentUser ? styles.sentMessage : styles.receivedMessage;
        const textStyle = isCurrentUser ? styles.sentText : styles.receivedText;

        return (
            <View style={messageStyle}>
                <Text style={textStyle}>{item.name} :</Text>
                <Text></Text>
                <Text style={{ fontSize: 20 }}>{item.content}</Text>
            </View>
        );

    };

    return (
        <View style={styles.container}>
            <FlatList data={messages.slice().reverse()}
                renderItem={renderItem}
                keyExtractor={(item) => item.timestamp.toString()}
                inverted
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Vui lòng nhập tin nhắn..."
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Text style={styles.sendButtonText}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bd6e6e',
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 8,
        backgroundColor: '#FFFFFF',
    },
    sendButton: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#53b904',
        borderRadius: 10,
        marginTop: 5,
        marginRight: 10,
        marginLeft: 50,
        padding: 10,
    },
    receivedMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 50,
        padding: 10,
    },
    sentText: {
        color: '#004bec',
        fontSize: 10,
        marginLeft: 55,
    },
    receivedText: {
        color: '#c50c0c',
        fontSize: 10,
        marginRight: 55,
    },
});
export default ChatScreen;