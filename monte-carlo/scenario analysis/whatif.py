import yfinance # get stoccks prices diretly to df
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

portfolio_composition = [('MSFT',0.5),('AAPL',0.2),('GOOG',0.3)]
returns = pd.DataFrame({})
for t in portfolio_composition:
  name = t[0]
  ticker = yfinance.Ticker(name)
  data = ticker.history(interval="1d",
     start="2010-01-01",end="2019-12-31")
  
  data['return_%s' % (name)] = data['Close'].pct_change(1)
  returns = returns.join(data[['return_%s' % (name)]],
     how="outer").dropna()

def simulate_returns(historical_returns,forecast_days):
  return historical_returns.sample(n = forecast_days, 
                replace = True).reset_index(drop = True)

def simulate_portfolio(historical_returns, 
   composition, 
   forecast_days):
  result = 0
  for t in composition:
    name,weight = t[0],t[1]
    s = simulate_returns(historical_returns['return_%s' % (name)], 
      forecast_days)
    result = result + s * weight
  return(result)
    # What-if analysis
    
def simulate_modified_returns(
      historical_returns,
      forecast_days,
      correct_mean_by):
  h = historical_returns.copy()
  new_series = h + correct_mean_by
  return new_series.sample(n=forecast_days,  
     replace = True).reset_index(drop=True)

def simulate_modified_portfolio(
   historical_returns,
   composition,
   forecast_days):
  
  result = 0
  
  for t in composition:
    name,weight,correction = t[0],t[1],t[2]
    s = simulate_modified_returns(
       historical_returns['return_%s' % (name)], 
       forecast_days,correction
    )
    
    result = result + s * weight
  
  return(result)

if __name__ == '__main__':
    # simulate_returns(returns['return_AAPL'],1000)
    # simulate_portfolio(returns,portfolio_composition,10)


    portfolio_composition = [
                            ('MSFT', 0.5,-0.0001), 
                            ('AAPL', 0.2,-0.001), 
                            ('GOOG', 0.3,-0.0005)]


    forecast_days = 20
    n_iterations = 200

    simulated_portfolios = simulation(returns,
    portfolio_composition,forecast_days,n_iterations)

    percentile_5th = simulated_portfolios.cumsum().apply(lambda x : np.percentile(x,5),axis=1)
    percentile_95th = simulated_portfolios.cumsum().apply(lambda x : np.percentile(x,95),axis=1)
    average_port = simulated_portfolios.cumsum().apply(lambda x : np.mean(x),axis=1)


    # Probability of reaching a target return

    target_return = 0.02
    target_prob_port = simulated_portfolios.cumsum().apply(
        lambda x : np.mean(x > target_return)
    ,axis=1)

    #The size of the error bars is calculated with the standard error formula:
    err_bars = np.sqrt(target_prob_port * (1-target_prob_port) / n_iterations)

    # sharpwr
    sharpe_indices = simulated_portfolios.apply(lambda x : np.mean(x)/np.std(x))