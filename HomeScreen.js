import React from 'react';
import { Button } from 'react-native';
import {BugFilled} from '@ant-design/icons'
const HomeScreen = ({ navigation }) => {

    return (
        <>
            <BugFilled />
            <Button 
                title="this is a homescreenbtn"
            />
        </>
    )

}

export default HomeScreen;