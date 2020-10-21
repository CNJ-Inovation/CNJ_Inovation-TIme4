# IRIS - DeepLearning AutoEncoder  - Hackaton CNJ Inova
### Rede Neural para Detecção de Anomalias

#### Como Usar a Rede Treinada

1. Download do git:https://github.com/CNJ-Inovation/CNJ_Inovation-TIme4.git
2. Descompactar os arquivos em rar na pasta dados
3. Abrir Read.py como arquivo python 3.6

#### Como treinar o modelo

1. Download do git:https://github.com/CNJ-Inovation/CNJ_Inovation-TIme4.git
2. Descompactar os arquivos em rar na pasta dados
3. Abrir autoencoder.py como arquivo python 3.6

***** o arquivo functions possui funções para os códigos Read.py e autoencoder.py


### Requirements da solução

* Windows or Linux
* Python 3.68 
* absl-py==0.10.0
* asgiref==3.2.10
* astunparse==1.6.3
* cachetools==4.1.1
* certifi==2020.6.20
* chardet==3.0.4
* cycler==0.10.0
* Django==3.1.2
* django-crispy-forms==1.9.2
* django-environ==0.4.5
* gast==0.3.3
* google-auth==1.22.1
* google-auth-oauthlib==0.4.1
* google-pasta==0.2.0
* grpcio==1.32.0
* h5py==2.10.0
* idna==2.10
* joblib==0.17.0
* Keras==2.4.3
* Keras-Preprocessing==1.1.2
* kiwisolver==1.2.0
* Markdown==3.3.2
* matplotlib==3.3.2
* numpy==1.18.5
* oauthlib==3.1.0
* opt-einsum==3.3.0
* pandas==1.1.3
* Pillow==8.0.0
* protobuf==3.13.0
* pyasn1==0.4.8
* pyasn1-modules==0.2.8
* pycodestyle==2.6.0
* pyparsing==2.4.7
* python-dateutil==2.8.1
* pytz==2020.1
* PyYAML==5.3.1
* requests==2.24.0
* requests-oauthlib==1.3.0
* rsa==4.6
* scikit-learn==0.23.2
* scipy==1.5.3
* seaborn==0.11.0
* six==1.15.0
* sklearn==0.0
* sqlparse==0.4.1
* tensorboard==2.3.0
* tensorboard-plugin-wit==1.7.0
* tensorflow==2.3.1
* tensorflow-estimator==2.3.0
* termcolor==1.1.0
* threadpoolctl==2.1.0
* urllib3==1.25.11
* Werkzeug==1.0.1
* wrapt==1.12.1


#### Datasets

Utilização de 83.400~ para o MVP de dados extraídos dos jsons referentes ao TRE de todos os estados disponibilizados para a competição.

#### Codigo de Treinamento da rede realiza as seguintes ações.

0. Usa o autoencoder.py
1. Na primeira etapa do codigo faz a leitura dos dados do json com os  83.400~, e extrai as principais características levantadas no estudo realizado para esta aplicação.
2. Realiza acodificação com o metodo de codificação sklearn.preprocessing.OrdinalEncoder()
3. Padronização dos dados em uma escala de 0 a 1.
4. Entrada no modelo autoencoder
5. Salva o modelo
6. Carrega o modelo e aplica aos dados do dataset para verificar o MSE.
7. Calculo para obtenção do threshould que será o valor referincial para que as anomalias sejam detectadas.
8. Compara o treshould com o MSE dos valores de cada processo, conforme definidos pela predição do autoencoder.
	se MSE > threshold = detecção de anomalia
	se MSE < threshold = sem anomalia

#### Codigo carregado no servidor.

0. Usa o Read.py
1. Carrega o modelo e aplica aos novos dados de entrada na inteligencia.
2. Obtem o MSE dos novos dados.
3. Calculo para obtenção do threshould que será o valor referincial para que as anomalias sejam detectadas.
3. Compara o treshould com o MSE dos valores dos novos processo, conforme definidos pela predição do autoencoder.
	se MSE > threshold = detecção de anomalia
	se MSE < threshold = sem anomalia

#### Resultados
O modelo chega a apresentar acurácia de 99% para aprendizagem das correlações exitentes nas variáveis categóricas do estudo. A função loss chega a obter resultados de 8x10-6.
Para os testes realizados com a inserção dos dados de novos processo os resultados foram obtidos com êxito na detecçao de anomalias em código nacional x classe, codigo nacionalx competencia, codigo nacional e número do processo, classe x codigo pai, numero x tribunal, entre outras realizadas, além de detectar erros nas próprias categorias, como valor colocado de forma errada.

