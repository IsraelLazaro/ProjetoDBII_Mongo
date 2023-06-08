const urlApi = 'http://localhost:3000/eventos';

/*BLOCO DE FUNÇÕES  */
/* Essa função Salva o Evento no Banco de Dados MongoDB */
window.salvarEvento = async function salvarEvento(obj){
    const aux = document.querySelector('#eventCoordinates').value;
    if(obj.eventName==="" || obj.eventDescription==="" || obj.dataInicio==="" || aux===""){
        alert('Preencha os campos obrigatórios!!');
    }else{
        try {
            const response = await fetch(urlApi, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });      
            if (response.ok) {  
                const divConfirmacao = document.querySelector('#confirmacao');                
                    alert('Evento salvo com sucesso!');
                    limparCampos();
                    const confirmacao = `<h3>O Evento ${obj.eventName} foi salvo com sucesso!!</h3>`;
                    console.log(confirmacao);
                    divConfirmacao.innerHTML = confirmacao;                                 
                    divConfirmacao.style.display = 'block';
                    setTimeout(() => {
                        divConfirmacao.style.display = "none";
                    }, 5000);
            } else {
                alert('Ocorreu um erro ao salvar o evento.');
                }
        } catch (error) {
            console.error('Erro ao conectar com a API:', error);
            }
    }
};
/* Inicio da função para realizar a troca das divs na apresentação da página */
window.trocarDivis = function trocarDivs(div1, div2, duracao){
    let opacidadeDiv1 = 0;
    let opacidadeDiv2 = 1;
    const intervalo = 10; 
    const targetOpacidade = 1;
    const increment = (targetOpacidade / duracao) * intervalo;
/* Inicia um intervalo para aumentar a opacidade da div a ser mostrada */
    const fadeIntervalo = setInterval(() => {
        opacidadeDiv1 += increment;
        div1.style.opacity = opacidadeDiv1;
        if (opacidadeDiv1 >= targetOpacidade) {
        clearInterval(fadeIntervalo); 
        div1.style.opacity = targetOpacidade; 
        div1.style.display = 'block'; 
        div2.style.display = 'none'; 
        }
    }, intervalo);
/* Inicia um intervalo para diminuir gradualmente a opacidade da div a ser ocultada */
    const fadeOutIntervalo = setInterval(() => {
        opacidadeDiv2 -= increment;
        div2.style.opacity = opacidadeDiv2;
        if (opacidadeDiv2 <= 0) {
        clearInterval(fadeOutIntervalo); 
        div2.style.opacity = 0;
        }
    }, intervalo);
};
/* Essa Função limpas todos os campos do cadastro do HTML */
window.limparCampos = function limparCampos(){
    document.querySelector('#author').value="";
    document.querySelector('#eventName').value="";
    document.querySelector('#dataInicio').value="";
    document.querySelector('#dataTermino').value="";
    document.querySelector('#eventDescription').value="";
    document.querySelector("#eventCoordinates").value="";
};


