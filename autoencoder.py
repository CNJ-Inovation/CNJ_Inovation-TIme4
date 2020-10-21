import functions as f
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import seaborn as sns
from pylab import rcParams
from sklearn.model_selection import train_test_split
rcParams['figure.figsize'] = 12, 6
sns.set(style='whitegrid', palette='muted', font_scale=1.5)

# Preparando os dados
path = "dados\justica_eleitoral1.json"
dataLoad = f.load_data(path)
encoded_seqs = f.prepare_inputs(dataLoad)
scaler = MinMaxScaler()
scaled_seqs = scaler.fit_transform(encoded_seqs)
X_train, X_test= train_test_split(scaled_seqs, test_size=0.33, random_state=1, shuffle=True)

# Construindo um Autoencouder
from keras.models import Model, load_model
from keras.layers import Input, Dense
from keras.callbacks import ModelCheckpoint, TensorBoard
from keras import regularizers

input_dim = X_train.shape[1]
encoding_dim = input_dim

nb_epoch = 1000
batch_size = 64
input_layer = Input(shape=(input_dim,))

encoder = Dense(encoding_dim, activation='sigmoid', activity_regularizer=regularizers.l1(10e-50))(input_layer)
encoder = (Dense(14, activation="relu")(encoder))
encoder = Dense(14, activation='relu')(encoder)
decoder = Dense(encoding_dim, activation='relu')(encoder)
decoder = Dense(input_dim, activation='sigmoid')(decoder)

autoencoder = Model(inputs=input_layer, outputs=decoder)

autoencoder.compile(optimizer='adam',
                    loss='mean_squared_error',
                    metrics=['accuracy'])

checkpointer = ModelCheckpoint(filepath="model_seqs2.h5",
                               verbose=0,
                               save_best_only=True)

tensorboard = TensorBoard(log_dir='./logs',
                          histogram_freq=0,
                          write_graph=True,
                          write_images=True)

history = autoencoder.fit(X_train, X_train,
                          epochs=nb_epoch,
                          batch_size=batch_size,
                          shuffle=True,
                          validation_data=(X_test, X_test),
                          verbose=1,
                          callbacks=[checkpointer, tensorboard]).history

#Carregando modelo salvo
autoencoder = load_model('model_seqs2.h5')
print(f'Min Loss:{np.min(history["loss"])}')
print(f'Max Accuracy:{np.max(history["acc"])}')

# ### Carregando novamente a base de dados com as anomalias
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
dataLoad[0]= newProcess
newProcess_encoder = f.prepare_inputs(dataLoad)
newProcess_scaled = scaler.fit_transform(newProcess_encoder)

#Predição e detecção de anomalias com os dados simulados
predict_newProcess = autoencoder.predict(newProcess_scaled)
mse_newProcess = np.mean(np.power( newProcess_scaled - predict_newProcess, 2), axis=1)
print(f'MSE novo processo : {mse_newProcess[0]}')


plt.plot(history['loss'])
plt.plot(history['val_loss'])
plt.title('model loss')
plt.ylabel('loss')
plt.xlabel('epoch')

plt.plot(history['acc'])
plt.plot(history['val_acc'])
plt.title('model acc')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train loss', 'test loss', 'train acc', 'test acc'], loc='upper right')
plt.show()
