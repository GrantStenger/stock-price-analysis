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

### Historical Data:
- Providers
    - Quandl
    - Yahoo Finance
    - Google Finance
- Types of Data
    - Fundamental Data
        - interest rates
        - inflation figures
        - corporate actions (dividends, stock-splits)
        - SEC filings
        - earnings figures
        - crop reports
        - meteorological data
    - News Data (sentiment analysis, NoSQL)
        - tweets
        - blogs
        - articles
    - Time Series Price Data
        - equities
        - bonds
        - commodities
        - forex

### Languages and Tools Used (So Far):
- HTML
- CSS
- JavaScript
    - jQuery
    - Plotly.js
- Bootstrap

### Languages and Tools to Use:
- Tensorflow.js
- Flask
- Quandl API
- Yahoo Finance API
- MySQL

### Hypotheses to Test:
- Test conventional wisdom
    - Is the saying "sell in May and go away" meaningful advice?
    - Test "buy the close, sell the open"
    - Test Momentum vs Mean Reversion strategies
- Try some ML
    - Time Series Data
        - LSTMs on time series data (RNN)
        - WaveNet
    - Neural Network, Random Forests, SVM, Logistic Regression, Naive Bayes
        - NLP Twitter Sentiment
        - Market Cap
        - P/E Ratio
        - Beta
        - Earnings per Share
        - Enterprise Value Multiple
        - P/E to growth ratio
        - Price/book ratio
        - Enterprise Value/Revenue
        - Price/cash flow ratio
        - Price/Sales Ratio
        - Dividend Yield
        - Profit Margin
        - Operating Margin
        - Return on Assets
        - Return on Equity
        - Volatility

### Trading Strategy Evaluation
- Methodology (momentum based, mean-reverting, market-neutral, directional, etc.)
- Sharpe Ratio (essentially reward/risk ratio)
- Maximum Drawdown
- Frequency (higher = more statistically significant, harder to implement, need higher quality data, transaction costs more important)
- Win/Los, Average Profit/Loss
- Number of parameters (overfitting)
- Benchmark (for large-cap US equities the S&P500 would be a natural comparison)
- Return and Leverage

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
- In general, the more round trip trades there are in the backtest, the higher will be the statistical significance.
- What are our assumptions? Gaussian distribution, etc.
- Follow proper hypothesis testing procedure.

### Resources Referenced:
- "Financial Time Series Prediction using Deep Learning", https://arxiv.org/pdf/1711.04174.pdf
- "Deep Learning for Forecasting Stock Returns in the Cross-Section", https://arxiv.org/pdf/1801.03018.pdf
- "Predict Forex Trend via Convolutional Neural Networks", https://arxiv.org/pdf/1801.01777.pdf
- "Deep Learning Stock Volatility with Google Domestic Trends" https://arxiv.org/pdf/1512.04916.pdf
- *Algorithmic Trading: Winning Strategies and Their Rationale*, Ernest P. Chan
- *Quantitative Trading: How to Build Your Own Algorithmic Trading Business*, Ernest P. Chan
- "Seasonal Effects in Equity Markets", Quantitative Research and Trading,  http://jonathankinlay.com/2016/05/seasonality-equity-markets/
- "The Optimism Cycle: Sell in May", https://papers.ssrn.com/sol3/papers.cfm?abstract_id=643583
- "'Sell in May and Go Away' Just Won't Go Away", https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2115197
- "Turn of the Month in Equity Indexes", https://quantpedia.com/screener/Details/41
- "Equity Returns at the Turn of the Month", https://papers.ssrn.com/sol3/papers.cfm?abstract_id=917884
- "Equity forecast: Predicting long term stock price movement using machine learning", https://arxiv.org/pdf/1603.00751.pdf
