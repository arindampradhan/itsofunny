import React, { Component } from 'react'
import { View, Text, Image, Dimensions, Modal } from 'react-native'
import { getCurrentComic, getMultipleComics } from '../data/actions';
import styled from 'styled-components/native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import theme from '../data/theme';


const Card = styled.View`
    margin-bottom: 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background-color: #fff;
    border: 2px solid #333;
    border-top-left-radius: 25px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
`

const CardHeader = styled.View`
    border-top-left-radius: 20px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-width: 2px;
    border-color: black;
    padding: 12px 20px;
    margin-bottom: 0px;
    background-color: ${({ touched }) => touched ? theme.primary : 'rgba(0, 0, 0, 0.03)'};
    border-bottom-width: 2px;
    border-bottom-color: #333;
`
const CardImg = styled.Image`
    width: ${Dimensions.get('window').width - 50};
    min-height: 300px;
    height: auto;

`

const CardHeaderText = styled.Text`
    color: ${({ touched }) => touched ? theme.white : theme.black};
`

const CardBody = styled.View`
    flex: 1 1 auto;
    padding: 20px;
`

const LoadingContainer = styled.View`
    display: flex;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 50px;
    flex: 1;
    justifyContent: center;
    alignItems: center;
`

const ViewContainer = styled.ScrollView`
    padding-left: 2px;
    padding-right: 2px;
    padding-top: 15px;
`

class ComicsCard extends Component {
    state = {
        cardTouched: false
    }

    render() {
        const a = {
            alignSelf: 'stretch'
        }

        if (this.props.loading) {
            return (
                <LoadingContainer>
                    <Bubbles size={5} color={theme.black} />
                </LoadingContainer>
            )
        }

        return (
            <Card
                onTouchEnd={() => this.setState({ cardTouched: !this.state.cardTouched })}
            >
                <CardHeader
                    touched={this.state.cardTouched}
                >
                    <CardHeaderText touched={this.state.cardTouched}>{this.props.number}. &nbsp;{this.props.header}</CardHeaderText>
                </CardHeader>
                <CardBody>
                    {this.props.image && this.state.cardTouched ?
                        (
                            <CardImg resizeMode={'contain'} style={a} source={{ uri: this.props.image }} />
                        )
                        : null}
                    <Text>{this.props.body}</Text>
                </CardBody>
            </Card >
        )
    }
}



export class ComicsList extends Component {
    state = {
        loading: true,
        latest: {},
        comics: [{ loading: true }, { loading: true }, { loading: true }, { loading: true }]
    }

    componentDidMount() {
        getCurrentComic()
            .then(data => {
                this.setState({ latest: data })
            })
            .then(() => {
                getMultipleComics()
                    .then(responses => {
                        const comics = responses.map((res, index) => {
                            let r = {
                                loading: true
                            }
                            if (res.status == 200) {
                                r = {
                                    loading: false,
                                    data: { ...res.data }
                                }
                            }
                            return r
                        })
                        this.setState({ comics, loading: false })
                    })
            })
    }


    render() {
        const { latest } = this.state
        return (
            <ViewContainer>
                <ComicsCard
                    number={'Latest'}
                    latest={true}
                    loading={this.state.loading}
                    image={latest['img']}
                    body={latest.transcript || latest.alt || latest.safe_title}
                    header={latest['title']}
                    loading={false}
                />
                {this.state.comics.map((item, index) => {
                    if (item.loading) return <ComicsCard key={index} loading={item.loading} />
                    return <ComicsCard image={item.data.img} number={index + 1} body={item.data.transcript || item.data.alt || item.data.safe_title} header={item.data.title} key={index} loading={false} />
                })}
            </ViewContainer>
        )
    }
}

export default ComicsList