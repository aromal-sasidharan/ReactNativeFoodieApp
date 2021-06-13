import React, {Component} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {AbstractUser, AbstractUserNumbers} from '../../domain/entity/User';
import CaurosellView from './views/CaurosellView';
import PhoneNumbersListView from "./views/PhoneNumbersListView"

type HomePageProps = {

}
type HomePageState = {
    users?: AbstractUser[]
    userNumbers?: AbstractUserNumbers
}

class HomePage extends Component<HomePageProps, HomePageState> {
    state: HomePageState = {
        users: undefined,
        userNumbers: undefined
    }
    async componentDidMount() {
        console.log("componentDidMount")
        try {
            let users: AbstractUser[] = await this.loadUser()
            let numbers = await this.loadNumbersOf("2")
            this.setState({
                users: users,
                userNumbers : numbers,
            })
        }
        catch (e) {
            console.log(e)
        }
        finally {

        }
    }
    loadNumbersOf(id:string): AbstractUserNumbers | undefined {
        const json = require("../../../assets/user_phone_number.json")
        const userNumbers: Array<AbstractUserNumbers> = JSON.parse(JSON.stringify(json))
        const userNumber = userNumbers.filter(x => x.id === id)
        return userNumber[0]
    }
    loadUser(): AbstractUser[] {
        const json = require("../../../assets/user.json")
        const users: Array<AbstractUser> = JSON.parse(JSON.stringify(json));
        return users
    }
    render() {
        
        return (
 
        <SafeAreaView style={styles.container} >
            <CaurosellView
                style={{ flex: 1 }}
                users={[]}
                isLoaded={false}
            />
            <PhoneNumbersListView
                numbers={this.state.userNumbers?.numbers ?? []}
                style={{ flex: 2, backgroundColor: "darkorange" }}
            />
        </SafeAreaView>
        )


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'red',
    },
});
export default HomePage

