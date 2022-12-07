const Log = require('../models/logs');
const { param } = require('../routes');

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
    async sinteticLog(req, res) {
        try{
            const {log} = req.body;

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
            var redo = [];

            started.map((item, index) => {

                if(separate[1] != undefined){
                    if(commited.indexOf(item) > -1 && separate[1].includes(item)){
                        fezRedo = 'Transação ' + item + ' realizou REDO';
                        resposta.push(fezRedo);
                        operations.map((element, pos) => {
                            if(element.includes(item)){
                                element = element.replace(item + ',', '');
                                element.split(',').map((param, i) => {
                                    if(param != ''){
                                        if(!isNumber(param)){
                                            param.split(' ').map((col) => {
                                                if(col != ''){
                                                    redo = [...redo, [col, parseInt(element.split(',')[i+2]), parseInt(element.split(',')[i-1])]];
                                                }
                                            });
                                        }                                    
                                    }
                                });
                            }
                        });

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
                                                    parametros = [...parametros, [col, parseInt(element.split(',')[i+2]), parseInt(element.split(',')[i-1])]];
                                                }
                                            });
                                        }                                    
                                    }
                                });
                            }
                        });
                    }
                }else{
                    if(commited.indexOf(item) > -1 && separate[0].includes(item)){
                        console.log(item)
                        fezRedo = 'Transação ' + item + ' realizou REDO';
                        resposta.push(fezRedo);
                        operations.map((element, pos) => {
                            if(element.includes(item)){
                                element = element.replace(item + ',', '');
                                element.split(',').map((param, i) => {
                                    if(param != ''){
                                        if(!isNumber(param)){
                                            param.split(' ').map((col) => {
                                                if(col != ''){
                                                    redo = [...redo, [col, parseInt(element.split(',')[i+2]), parseInt(element.split(',')[i-1])]];
                                                }
                                            });
                                        }                                    
                                    }
                                });
                            }
                        });
                    }else if(separate[0].includes(item)){
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
                                                console.log(param);
                                                if(col != ''){
                                                    if(variaveis.id.indexOf(i-1)){
                                                        aux = [parseInt(element.split(',')[i+1]), parseInt(element.split(',')[i+2])];
                                                    }
                                                }
                                            });
                                        }                                    
                                    }
                                });
                            }
                        });
                    }
                }
            });

            parametros.map(async (item) => {
                const idTupla = await Log.findOne({where: {id: item[2]}});
            
                if(idTupla){
                    if(item[0] == 'A'){
                        const log = await Log.update({a: item[1]}, {where: {id: item[2]}}).then((result) => {console.log(result)});
                    }else{
                        const log = await Log.update({b: item[1]}, {where: {id: item[2]}}).then((result) => {console.log(result)});
                    }
                }else{
                    return 'Não existe';
                }
            });

            redo.map(async (item) => {
                const idTupla = await Log.findOne({where: {id: item[2]}});
            
                if(idTupla){
                    if(item[0] == 'A'){
                        const log = await Log.update({a: item[1]}, {where: {id: item[2]}}).then((result) => {console.log(result)});
                    }else{
                        const log = await Log.update({b: item[1]}, {where: {id: item[2]}}).then((result) => {console.log(result)});
                    }
                }else{
                    return 'Não existe';
                }
            });

            resposta.push()
            
            res.json({resposta, parametros, redo});
        }catch(error){
            console.log(error);
            res.status(400).json({error: 'Erro ao realizar o log'});
        }
        
    },

}