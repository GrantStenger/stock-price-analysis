# [Stock Price Analysis](https://stock-price-analysis.herokuapp.com/)

## Prompt: De-Mystifying ML
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

## Installation and Set-Up
- Install dependencies
  - Run: `pip install -r requirements.txt`
- Configuring MySQL
  - In MySQL Workbench create a new database and user
  - Run financial_db.sql script to create the tables
  - Create a file called passwords.py (because I didn't want to publish my passwords online)
    - This is the entire script:
      ```python
      # insert_symbols.py
      PASSWORD = "{your_MySQL_password_here}"
      API_KEY = "{your__Quandl_api_key_here}"
      ```
    - Import these variables with `from passwords.py import PASSWORD, API_KEY` whenever necessary. I've already done that for you for all included scripts.
  - Run insert_symbols.py to populate the MySQL symbol table
    - This parses Wikipedia's S&P500 page using requests and BeautifulSoup
    - Then the ticker symbols and other relevant information are inserted into the MySQL database
  - Run price_retrieval.py to populate the daily_price table
    - Connects to the database and obtains a list of the S&P500 ticker symbols
    - Obtains OHLCV data from Quandl
    - Adds relevant data to the database (~20,000,000 data points takes about 15 minutes)
  - Run sql_to_dataframe.py to grab relevant data from MySQL and return a pandas DataFrame
    - Data analysis MUCH easier with pandas
    - From here you can start to do your own data analysis.
- What's coming:
  - Now that we can use pandas, we will begin our analysis.
  - Among many possible explorations, one idea is to apply WaveNet to time series data.
  - We will host [the website](https://stock-price-analysis.herokuapp.com/) using Heroku and Flask.
  - We will add the content of the presentation to the site.

<!-- ## Task Breakdown
- Monica: performance data
- Yeon: News Headline (Natural Language Processing)
- Grant
  - Recurrent Neural Networks (predict time series data)
  - Seasonality if time permits -->

## Languages and Tools
- HTML
- CSS
- JavaScript
  - jQuery
  - Plotly.js
- Bootstrap
- Python
  - BeautifulSoup
  - requests
  - MySQLdb
  - quandl
  - Matplotlib
  - pandas
  - Keras
  - Tensorflow
  - Tweepy
- MySQL
- Flask
- Heroku

## Unofficial Notes

### Possible Data Options
- Providers
  - Quandl
    - WIKI Prices
    - Zacks Fundamentals Collection A
    - [HistData](http://www.histdata.com/) (Tick level Forex data as .csv)
  - Yahoo Finance (deprecated, buggy)
  - Alpha Vantage
  - EOD Historical Data
  - Intrinio
  - QuantQuote
- Types of Data
  - MongoDB for Fundamental and Macroeconomic Data
    - Interest rates
    - Inflation figures
    - Corporate actions (dividends, stock-splits)
    - SEC filings
    - Earnings figures
    - Crop reports
    - Meteorological data
    - News Data (Tweets, Articles, Blogs)
  - MySQL for Time Series Price Data (e.g. OHLCV)
    - Equities
      - Price
      - Symbol
      - Exchanges
      - Vendor
    - Bonds
    - Commodities
    - Forex
  - Data Used So Far
    - Quandl WIKI OHLCV data for S&P 500

### Hypotheses to Test
- Test conventional wisdom
  - Is the saying "sell in May and go away" meaningful advice?
  - Test "buy the close, sell the open"
  - Test mean-reversion strategies
    - [Test Bear Call Spread](http://www.wyattresearch.com/article/mean-reversion-strategy/)
    - [Mean Reversion: Simple Trading Strategies Part 1](https://medium.com/auquan/mean-reversion-simple-trading-strategies-part-1-a18a87c1196a)
  - Test momentum strategies
  - Test simple increase-decrease markov model
- Try some ML
  - Univariate Analysis on Time Series Data
    - LSTMs on time series data (RNN)
      - [Applying Deep Learning to Time Series Forecasting with TensorFlow](https://mapr.com/blog/deep-learning-tensorflow/)
      - [Predict Stock Prices Using RNN: Part 1](https://lilianweng.github.io/lil-log/2017/07/08/predict-stock-prices-using-RNN-part-1.html)
      - Use S&P 500 from 1950 to today
      - Try to predict opening prices
      - Take latest 10% of data as test data
      - Normalize the data so instead of predicting absolute price, predict relative change in price.
      - [A deep learning framework for financial time series using stacked autoencoders and long-short term memory](http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0180944)
      - https://github.com/llSourcell/How-to-Predict-Stock-Prices-Easily-Demo
      - https://github.com/AndysDeepAbstractions/How-to-Predict-Stock-Prices-Easily-Demo
      - https://github.com/etai83/lstm_stock_prediction/tree/68d3240b512a90802882bc5d46b27cabeeecc9dd
      - https://github.com/llSourcell/AI_in_Finance
      - [The Unreasonable Effectiveness of Recurrent Neural Networks](http://karpathy.github.io/2015/05/21/rnn-effectiveness/)
      - [Financial Market Time Series Prediction with Recurrent Neural
Networks](http://cs229.stanford.edu/proj2012/BernalFokPidaparthi-FinancialMarketTimeSeriesPredictionwithRecurrentNeural.pdf)
      - [Predict stock market prices using RNN model with multilayer LSTM cells + optional multi-stock embeddings.](https://github.com/lilianweng/stock-rnn)
      - [Understanding LSTM Networks](http://colah.github.io/posts/2015-08-Understanding-LSTMs/)
    - WaveNet
    - Echo State Networks
      - https://en.wikipedia.org/wiki/Echo_state_network
  - Multivariate Analysis
    - Techniques
      - Neural Network
      - Random Forests
      - SVM
      - Logistic Regression
      - Naive Bayes
    - Possible Features
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
- What is the Sharpe Ratio? (Essentially reward/risk ratio.)
- How deep and long are the drawdowns?
- What was the win/loss ratio and what was the average profit and loss?
- How does this strategy compare to our benchmark? For large-cap US equities the S&P500 would be a natural comparison.
- How consistent are the returns?
- How did the performance of the strategy change over the years? Do returns start to diminish over time?
- Does the model overfit? Look at number of parameters. Do sensitivity analysis and dimensionality reduction.
- How will transaction costs (commission, slippage, market impact) affect the strategy? No backtest is realistic without incorporating transaction costs.
- Does the data suffer from survivorship bias?
    - Yahoo Finance data does have survivorship bias.
    - "Buy low price stocks" strategies are highly susceptible to survivorship
- Does the model use high-low data? High and low data is potentially susceptible to look-ahead bias and is sometimes unreliable.
- How frequently does the model trade? Higher generally means more statistically significant, harder to implement, higher quality data needed, and transaction costs become more important.
- How accurate was data? ("Garbage in, garbage out.")
- Did we follow proper hypothesis testing procedure?
- Running the model on actual unseen data is the most reliable way to test it.

### Potentially Helpful Resources
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
- Backtesting
  - https://github.com/mhallsmoore/qstrader
  - https://github.com/ematvey/pybacktest
  - https://www.quantstart.com/articles/backtesting-systematic-trading-strategies-in-python-considerations-and-open-source-frameworks
- [Front end checklist](https://frontendchecklist.io/)

## Acknowledgments
- Bootstrap [Scrolling Nav](https://startbootstrap.com/template-overviews/scrolling-nav/) template used.
- *Successful Algorithmic Trading* by Michael Halls-Moore frequently consulted and open-source scripts used to initialize databases.
- *Quantitative Trading: How to Build Your Own Algorithmic Trading Business* by Ernest P. Chan referenced for "[Trading Strategy Evaluation](#trading-strategy-evaluation)"
