const Log = require('../models/logs');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function conversor(param, array) {
    return function(key, value) {
        if (key == param) {
            return array;
        }
        return value;
    }
}

module.exports = {
    async sinteticLog(req, res) {
        try{
            const {log, variaveis} = req.body;

            const logger = [];

            var separate = log.split(/\s*CKPT\s*/);

            var first = log.split(/\s*<\s*/);

            first.forEach(item => {
                var second = item.split(/\s*>\s*/);
                second.forEach(element => {
                    if(element != ''){
                        logger.push(element);
                    }
                });
            });

            //var second = first.split(/\s*>\s*/);

            var started = [];
            var commited = [];
            var ckpt = [];
            var operations = [];

            logger.forEach((item) => {
                var aux = 0;
                if(item.includes('start') ){
                    aux = item.split(/\s*start\s*/);
                    aux.map((item) => {
                        item != '' ?  started.push(item) : item = 0;
                    });
                }
                else if( item.includes('commit') ){
                    aux = item.split(/\s*commit\s*/);
                    aux.map((item) => {
                        item != '' ?  commited.push(item) : item = 0;
                    });
                }
                else if( item.includes('CKPT') ){
                    aux = item.split(/\s*CKPT\s*/);
                    aux.map((item) => {
                        item != '' ?  ckpt.push(item) : item = 0;
                    });
                }else{
                    operations.push(item);
                }
            });

            var resposta = [];
            var fezRedo = '';
            var naoFez = '';
            var parametros = [];


            started.map((item, index) => {
                if(commited.indexOf(item) > -1 && separate[1].includes(item)){
                    fezRedo = 'Transação ' + item + ' realizou REDO';
                    resposta.push(fezRedo);
                }else if(separate[1].includes(item)){
                    naoFez = 'Transação ' + item + ' não realizou REDO';
                    resposta.push(naoFez);
                }else{
                    operations.map((element, pos) => {
                        if(element.includes(item)){
                            element = element.replace(item + ',', '');
                            element.split(',').map((param, i) => {
                                if(param != ''){
                                    if(!isNumber(param)){
                                        param.split(' ').map((col) => {
                                            if(col != ''){
                                                if(variaveis.id.indexOf(i-1)){
                                                    variaveis[col] = [parseInt(element.split(',')[i+1]), parseInt(element.split(',')[i+2])];
                                                }
                                            }
                                        });
                                    }                                    
                                }
                            });
                        }
                    });
                }

            });
            
            res.json({resposta, variaveis});
        }catch{

        }
        
    }
}