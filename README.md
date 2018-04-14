# Data Analytics Bootcamp Final Project: Stock Price Analysis

## Prompt

### De-Mystifying ML

1. Find a Problem worth Solving, Analyzing, or Visualizing

2. Use ML in the context of technologies learned

3. You must use:
    * Sci-Kit Learn and/or another machine learning library

4. You must use at least two of the below
    * Python Pandas
    * Python Matplotlib
    * Python Tweepy
    * Python Flask
    * HTML/CSS/Bootstrap
    * JavaScript Plotly
    * Javascript D3.js
    * JavaScript Leaflet
    * MySQL Database
    * MongoDB Database
    * Google Cloud SQL
    * Amazon AWS
    * Tableau

5. Prepare a 15 minute “data deep dive” or “infrastructure walkthrough” that shows machine learning the context of what we’ve already learned.

6. Example Projects:
    * Create a Front-End Interface that Maps to an API to “Smarten” the Algorithm
    * Perform a Deep Dive of Existing Data Using Machine Learning
    * Create a Visualization that Continues to “Learn” Where Clusters Lie Based on ML (Use D3 or Plotly to Change the Visualization)
    * Create an idea with “mock data” that simulates how machine learning might be used
    * Create an analysis of existing data to make a prediction, classification, or regression


## Notes

### Data sets to use:
- Quandl
- Yahoo Finance
- Google Finance

### Languages and Tools Used (So Far):
- HTML
- CSS
- JavaScript
    - jQuery
    - Plotly.js
- Bootstrap

### Hypotheses to Test:
- Test conventional wisdom
    - Is the saying "sell in May and go away" meaningful advice?
    - Test "buy the close, sell the open"
    - Test Momentum vs Mean Reversion strategies
- Try some ML
    - LSTMs on time series data
    - NLP Twitter Sentiment
    - WaveNet
    - Neural Network, SVM, Random Forests, Logistic Regression

### Important Factors to Keep in Mind:
- How consistent are the returns?
- How deep and long are the drawdowns?
- How will transaction costs affect the strategy (commission, slippage, market impact)?
- Does the data suffer from survivorship bias?
    - Yahoo Finance data does have survivorship bias
    - "Buy low price stocks" strategy highly susceptible to survivorship
- How did the performance of the strategy change over the years? Do returns start to diminish over time?
- High and low data is potentially susceptible to look-ahead bias and is commonly unreliable.
- Sharpe ratio and drawdowns are probably the most important ways to evaluate a strategy.
- Does the model overfit?
- Running the model on actual unseen data is the most reliable way to test it.
- Fewer parameters is better. Dimensionality reduction, sensitivity analysis.
- No backtest is realistic without incorporating transaction costs.
