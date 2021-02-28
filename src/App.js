import { Component } from 'react';

import FeedbackOptions from './components/FeedbackOptions';
import Statistics from './components/Statistics';
import Section from './components/Section';
import Notification from './components/Notification';
import Container from './components/Container';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countFeedbackHandler = value => {
    this.setState(prevState => ({
      [value]: prevState[value] + 1,
    }));
  };

  countPositiveFeedbackPercentage = (good, total) =>
    Math.round((good / total) * 100);

  countTotalFeedback = arrayOfValues =>
    arrayOfValues.reduce((acc, value) => acc + value, 0);

  render() {
    const { good, neutral, bad } = this.state;
    const keys = Object.keys(this.state);
    const values = Object.values(this.state);
    const total = this.countTotalFeedback(values);
    const positivePercent = this.countPositiveFeedbackPercentage(good, total);

    return (
      <Container>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={keys}
            onLeaveFeedback={this.countFeedbackHandler}
          />
        </Section>

        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={positivePercent}
            />
          ) : (
            <Notification message="No feedback given" />
          )}
        </Section>
      </Container>
    );
  }
}

export default App;
