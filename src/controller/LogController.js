const Log = require('../models/logs');

module.exports = {
    async sinteticLog(req, res) {
        try{
            const {descricao} = req.body;

            const logger = [];

            var first = descricao.split(/\s*<\s*/);

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

            logger.forEach((item) => {
                var aux = 0;
                if(item.includes('start') ){
                    aux = item.split(/\s*start\s*/);
                    aux.map((item) => {
                        item != '' ?  started.push(item) : item = 0;
                    });
                }
                if( item.includes('commit') ){
                    aux = item.split(/\s*commit\s*/);
                    aux.map((item) => {
                        item != '' ?  commited.push(item) : item = 0;
                    });
                }
                if( item.includes('CKPT') ){
                    aux = item.split(/\s*CKPT\s*/);
                    aux.map((item) => {
                        item != '' ?  ckpt.push(item) : item = 0;
                    });
                }                        
            });

            var resposta = [];
            var fezRedo = '';
            var naoFez = '';

            started.map((item) => {
                    commited.map((commit) => {
                        
                            if(commit == item){
                                fezRedo = 'Transação ' + item + ' realizou REDO';
                                resposta.push(fezRedo);
                            }
                        
                    });


            });

            console.log(resposta);
            
            res.json({descricao});
        }catch{

        }
        
    }
}