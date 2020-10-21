import functions as f
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import seaborn as sns
from pylab import rcParams
from sklearn.model_selection import train_test_split
from keras.models import load_model
import  tensorflow as tf
rcParams['figure.figsize'] = 12, 6
sns.set(style='whitegrid', palette='muted', font_scale=1.5)


path = "dados\justica_eleitoral.json"
dataLoad= f.load_data(path)
encoded_seqs = f.prepare_inputs(dataLoad)

autoencoder = load_model('dados\model_seqs2.h5')

# ### Carregando novamente a base de dados com as anomalias
scaler = MinMaxScaler()
scaled_seqs = scaler.fit_transform(encoded_seqs)

# fazer a predição com base na rede treinada
predicted = autoencoder.predict(scaled_seqs)

# MSE em termo de erro
mse = np.mean(np.power(scaled_seqs - predicted, 2), axis=1)

#Data Frame com MSE
seqs_ds = pd.DataFrame(dataLoad)
seqs_ds['MSE'] = mse

# Detectando os erros no data frame
mse_threshold = np.quantile(seqs_ds['MSE'], 0.80)
print(f'MSE threshhold:{mse_threshold}')
seqs_ds['MSE_Outlier'] = 0
seqs_ds.loc[seqs_ds['MSE'] > mse_threshold, 'MSE_Outlier'] = 1
print(f"Num of MSE outlier:{seqs_ds['MSE_Outlier'].sum()}")

#input e preparação com dados Simulados
newProcess = np.array([[0,11455,0, 0, 0, 2,156, 2]])
dataLoad[0] = newProcess
newProcess_encoder = f.prepare_inputs(dataLoad)
newProcess_scaled = scaler.fit_transform(newProcess_encoder)

#Predição e detecção de anomalias com os dados simulados
predict_newProcess = autoencoder.predict(newProcess_scaled)
mse_newProcess = np.mean(np.power( newProcess_scaled - predict_newProcess, 2), axis=1)
print('___________________________________________________________________________________________________________')
if mse_newProcess[0] >mse_threshold:
    print(f'MSE novo processo : {mse_newProcess[0]} = Anomaly. Detected')
else:
    print(f'MSE novo processo : {mse_newProcess[0]} = Anomaly. No Detected')