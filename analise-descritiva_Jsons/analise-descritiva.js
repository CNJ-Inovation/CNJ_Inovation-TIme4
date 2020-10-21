
//Voumetria de registros com e sem assunto local
db.justica_eleitoral.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: true} } .count()

db.justica_eleitoral.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: false} } ).count()

db.justica_estadual.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: true} } ).count()
db.justica_estadual.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: false} } ).count()

db.justica_federal.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: true} } ).count()
db.justica_federal.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: false} } ).count()

db.justica_eleitoral.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: true} } ).count()
db.justica_eleitoral.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: false} } ).count()

db.justica_militar.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: true} } ).count()
db.justica_militar.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: false} } ).count()

db.justica_trabalho.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: true} } ).count()
db.justica_trabalho.find( { "dadosBasicos.assunto.assuntoLocal" : {$exists: false} } ).count()



//Voumetria de registros com e sem código nacional
db.justica_eleitoral.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: true} } ).count()
db.justica_eleitoral.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: false} } ).count()

db.justica_estadual.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: true} } ).count()
db.justica_estadual.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: false} } ).count()

db.justica_federal.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: true} } ).count()
db.justica_federal.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: false} } ).count()

db.justica_eleitoral.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: true} } ).count()
db.justica_eleitoral.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: false} } ).count()

db.justica_militar.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: true} } ).count()
db.justica_militar.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: false} } ).count()

db.justica_trabalho.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: true} } ).count()
db.justica_trabalho.find( { "dadosBasicos.assunto.codigoNacional" : {$exists: false} } ).count()


//Criar coleção com registros que possuem apenas 1 assunto
//Para cada justiça, é realizado uma busca por registros que possuem apenas um assunto (dadosBasicos.assunto)
//E então é criado uma nova coleção dentro do mongodb
db.justica_eleitoral.find(
{
  $expr:{
    $eq:[{$size:'$dadosBasicos.assunto'}, 1]
    },
  'dadosBasicos.assunto': {$exists:true}
}
).forEach( function(i) {
  i.ts_imported = new Date();
  db.justica_eleitoral_filter.insert(i);
})

db.justica_estadual.find(
{
  $expr:{
    $eq:[{$size:'$dadosBasicos.assunto'}, 1]
    },
  'dadosBasicos.assunto': {$exists:true}
}
).forEach( function(i) {
  i.ts_imported = new Date();
  db.justica_estadual_filter.insert(i);
})

db.justica_federal.find(
{
  $expr:{
    $eq:[{$size:'$dadosBasicos.assunto'}, 1]
    },
  'dadosBasicos.assunto': {$exists:true}
}
).forEach( function(i) {
  i.ts_imported = new Date();
  db.justica_federal_filter.insert(i);
})

db.justica_militar.find(
{
  $expr:{
    $eq:[{$size:'$dadosBasicos.assunto'}, 1]
    },
  'dadosBasicos.assunto': {$exists:true}
}
).forEach( function(i) {
  i.ts_imported = new Date();
  db.justica_militar_filter.insert(i);
})


db.justica_trabalho.find(
{
  $expr:{
    $eq:[{$size:'$dadosBasicos.assunto'}, 1]
    },
  'dadosBasicos.assunto': {$exists:true}
}
).forEach( function(i) {
  i.ts_imported = new Date();
  db.justica_trabalho_filter.insert(i);
})




//Volumetria de registros distintos por campo
//Para cada tipo de justiça, é feito a busca pela quantidade de registros distintos
// presentes na base para a rede neural

//dadosBasicos.classeProcessual
db.justica_eleitoral.distinct('dadosBasicos.classeProcessual').length
db.justica_estadual.distinct('dadosBasicos.classeProcessual').length
db.justica_federal.distinct('dadosBasicos.classeProcessual').length
db.justica_militar.distinct('dadosBasicos.classeProcessual').length
db.justica_trabalho.distinct('dadosBasicos.classeProcessual').length
//dadosBasicos.assunto.assuntoLocal.codigoAssunto
db.justica_eleitoral.distinct('dadosBasicos.assunto.assuntoLocal.codigoAssunto').length
db.justica_estadual.distinct('dadosBasicos.assunto.assuntoLocal.codigoAssunto').length
db.justica_federal.distinct('dadosBasicos.assunto.assuntoLocal.codigoAssunto').length
db.justica_militar.distinct('dadosBasicos.assunto.assuntoLocal.codigoAssunto').length
db.justica_trabalho.distinct('dadosBasicos.assunto.assuntoLocal.codigoAssunto').length
//dadosBasicos.codigoLocalidade
db.justica_eleitoral.distinct('dadosBasicos.codigoLocalidade').length
db.justica_estadual.distinct('dadosBasicos.codigoLocalidade').length
db.justica_federal.distinct('dadosBasicos.codigoLocalidade').length
db.justica_militar.distinct('dadosBasicos.codigoLocalidade').length
db.justica_trabalho.distinct('dadosBasicos.codigoLocalidade').length
//movimento.movimentoLocal.codigoMovimento
db.justica_eleitoral.distinct('movimento.movimentoLocal.codigoMovimento').length
db.justica_estadual.distinct('movimento.movimentoLocal.codigoMovimento').length
db.justica_federal.distinct('movimento.movimentoLocal.codigoMovimento').length
db.justica_militar.distinct('movimento.movimentoLocal.codigoMovimento').length
db.justica_trabalho.distinct('movimento.movimentoLocal.codigoMovimento').length
//dadosBasicos.orgaoJulgador.codigoMunicipioIBGE
db.justica_eleitoral.distinct('dadosBasicos.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_estadual.distinct('dadosBasicos.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_federal.distinct('dadosBasicos.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_militar.distinct('dadosBasicos.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_trabalho.distinct('dadosBasicos.orgaoJulgador.codigoMunicipioIBGE').length
//movimento.orgaoJulgador.codigoMunicipioIBGE
db.justica_eleitoral.distinct('movimento.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_estadual.distinct('movimento.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_federal.distinct('movimento.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_militar.distinct('movimento.orgaoJulgador.codigoMunicipioIBGE').length
db.justica_trabalho.distinct('movimento.orgaoJulgador.codigoMunicipioIBGE').length
//dadosBasicos.assunto.codigoNacional
db.justica_eleitoral.distinct('dadosBasicos.assunto.codigoNacional').length
db.justica_estadual.distinct('dadosBasicos.assunto.codigoNacional').length
db.justica_federal.distinct('dadosBasicos.assunto.codigoNacional').length
db.justica_militar.distinct('dadosBasicos.assunto.codigoNacional').length
db.justica_trabalho.distinct('dadosBasicos.assunto.codigoNacional').length
//movimento.movimentoNacional.codigoNacional'
db.justica_eleitoral.distinct('movimento.movimentoNacional.codigoNacional').length
db.justica_estadual.distinct('movimento.movimentoNacional.codigoNacional').length
db.justica_federal.distinct('movimento.movimentoNacional.codigoNacional').length
db.justica_militar.distinct('movimento.movimentoNacional.codigoNacional').length
db.justica_trabalho.distinct('movimento.movimentoNacional.codigoNacional').length
//dadosBasicos.orgaoJulgador.codigoOrgao
db.justica_eleitoral.distinct('dadosBasicos.orgaoJulgador.codigoOrgao').length
db.justica_estadual.distinct('dadosBasicos.orgaoJulgador.codigoOrgao').length
db.justica_federal.distinct('dadosBasicos.orgaoJulgador.codigoOrgao').length
db.justica_militar.distinct('dadosBasicos.orgaoJulgador.codigoOrgao').length
db.justica_trabalho.distinct('dadosBasicos.orgaoJulgador.codigoOrgao').length
//movimento.orgaoJulgador.codigoOrgao
db.justica_eleitoral.distinct('movimento.orgaoJulgador.codigoOrgao').length
db.justica_estadual.distinct('movimento.orgaoJulgador.codigoOrgao').length
db.justica_federal.distinct('movimento.orgaoJulgador.codigoOrgao').length
db.justica_militar.distinct('movimento.orgaoJulgador.codigoOrgao').length
db.justica_trabalho.distinct('movimento.orgaoJulgador.codigoOrgao').length
//dadosBasicos.assunto.assuntoLocal.codigoPaiNacional
db.justica_eleitoral.distinct('dadosBasicos.assunto.assuntoLocal.codigoPaiNacional').length
db.justica_estadual.distinct('dadosBasicos.assunto.assuntoLocal.codigoPaiNacional').length
db.justica_federal.distinct('dadosBasicos.assunto.assuntoLocal.codigoPaiNacional').length
db.justica_militar.distinct('dadosBasicos.assunto.assuntoLocal.codigoPaiNacional').length
db.justica_trabalho.distinct('dadosBasicos.assunto.assuntoLocal.codigoPaiNacional').length
//movimento.movimentoLocal.codigoPaiNacional
db.justica_eleitoral.distinct('movimento.movimentoLocal.codigoPaiNacional').length
db.justica_estadual.distinct('movimento.movimentoLocal.codigoPaiNacional').length
db.justica_federal.distinct('movimento.movimentoLocal.codigoPaiNacional').length
db.justica_militar.distinct('movimento.movimentoLocal.codigoPaiNacional').length
db.justica_trabalho.distinct('movimento.movimentoLocal.codigoPaiNacional').length
//dadosBasicos.assunto.assuntoLocal.descricao
db.justica_eleitoral.distinct('dadosBasicos.assunto.assuntoLocal.descricao').length
db.justica_estadual.distinct('dadosBasicos.assunto.assuntoLocal.descricao').length
db.justica_federal.distinct('dadosBasicos.assunto.assuntoLocal.descricao').length
db.justica_militar.distinct('dadosBasicos.assunto.assuntoLocal.descricao').length
db.justica_trabalho.distinct('dadosBasicos.assunto.assuntoLocal.descricao').length
//dadosBasicos.dscSistema
db.justica_eleitoral.distinct('dadosBasicos.dscSistema').length
db.justica_estadual.distinct('dadosBasicos.dscSistema').length
db.justica_federal.distinct('dadosBasicos.dscSistema').length
db.justica_militar.distinct('dadosBasicos.dscSistema').length
db.justica_trabalho.distinct('dadosBasicos.dscSistema').length
//dadosBasicos.orgaoJulgador.instancia
db.justica_eleitoral.distinct('dadosBasicos.orgaoJulgador.instancia').length
db.justica_estadual.distinct('dadosBasicos.orgaoJulgador.instancia').length
db.justica_federal.distinct('dadosBasicos.orgaoJulgador.instancia').length
db.justica_militar.distinct('dadosBasicos.orgaoJulgador.instancia').length
db.justica_trabalho.distinct('dadosBasicos.orgaoJulgador.instancia').length
//movimento.orgaoJulgador.instancia
db.justica_eleitoral.distinct('movimento.orgaoJulgador.instancia').length
db.justica_estadual.distinct('movimento.orgaoJulgador.instancia').length
db.justica_federal.distinct('movimento.orgaoJulgador.instancia').length
db.justica_militar.distinct('movimento.orgaoJulgador.instancia').length
db.justica_trabalho.distinct('movimento.orgaoJulgador.instancia').length
//movimento.nivelSigilo
db.justica_eleitoral.distinct('movimento.nivelSigilo').length
db.justica_estadual.distinct('movimento.nivelSigilo').length
db.justica_federal.distinct('movimento.nivelSigilo').length
db.justica_militar.distinct('movimento.nivelSigilo').length
db.justica_trabalho.distinct('movimento.nivelSigilo').length
//dadosBasicos.orgaoJulgador.nomeOrgao
db.justica_eleitoral.distinct('dadosBasicos.orgaoJulgador.nomeOrgao').length
db.justica_estadual.distinct('dadosBasicos.orgaoJulgador.nomeOrgao').length
db.justica_federal.distinct('dadosBasicos.orgaoJulgador.nomeOrgao').length
db.justica_militar.distinct('dadosBasicos.orgaoJulgador.nomeOrgao').length
db.justica_trabalho.distinct('dadosBasicos.orgaoJulgador.nomeOrgao').length
//movimento.orgaoJulgador.nomeOrgao
db.justica_eleitoral.distinct('movimento.orgaoJulgador.nomeOrgao').length
db.justica_estadual.distinct('movimento.orgaoJulgador.nomeOrgao').length
db.justica_federal.distinct('movimento.orgaoJulgador.nomeOrgao').length
db.justica_militar.distinct('movimento.orgaoJulgador.nomeOrgao').length
db.justica_trabalho.distinct('movimento.orgaoJulgador.nomeOrgao').length
//dadosBasicos.procEl
db.justica_eleitoral.distinct('dadosBasicos.procEl').length
db.justica_estadual.distinct('dadosBasicos.procEl').length
db.justica_federal.distinct('dadosBasicos.procEl').length
db.justica_militar.distinct('dadosBasicos.procEl').length
db.justica_trabalho.distinct('dadosBasicos.procEl').length
//movimento.tipoDecisao
db.justica_eleitoral.distinct('movimento.tipoDecisao').length
db.justica_estadual.distinct('movimento.tipoDecisao').length
db.justica_federal.distinct('movimento.tipoDecisao').length
db.justica_militar.distinct('movimento.tipoDecisao').length
db.justica_trabalho.distinct('movimento.tipoDecisao').length
//movimento.tipoResponsavelMovimento
db.justica_eleitoral.distinct('movimento.tipoResponsavelMovimento').length
db.justica_estadual.distinct('movimento.tipoResponsavelMovimento').length
db.justica_federal.distinct('movimento.tipoResponsavelMovimento').length
db.justica_militar.distinct('movimento.tipoResponsavelMovimento').length
db.justica_trabalho.distinct('movimento.tipoResponsavelMovimento').length
