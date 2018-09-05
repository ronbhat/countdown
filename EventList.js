import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';

import EventCard from './EventCard';

import { getEvents } from './api';

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#f3f3f3'
    }
});

class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                events: this.state.events.map(evt => ({
                    ...evt,
                    timer: Date.now()
                }))
            });
        }, 1000);

        this.props.navigation.addListener('didFocus', () => {
            getEvents().then(events => this.setState({ events }));            
        });

    }

    handleEvent = () => {
        this.props.navigation.navigate('form');
    }

    render() {
        return[
            <FlatList
                key='flatlist'
                style={styles.list}
                data = {this.state.events} 
                renderItem = {({ item,separators }) => <EventCard event={item}/>}
                keyExtractor = {item => item.id}
            />,
            <ActionButton
                key='fab'
                onPress={this.handleEvent}
                buttonColor='rgba(231, 76, 60, 1)'
            />
        ]; 
    }
}

export default EventList;