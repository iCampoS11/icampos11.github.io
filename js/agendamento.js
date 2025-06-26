document.addEventListener('DOMContentLoaded', () => {
    // Configura o datepicker
    const dataAgendamento = document.getElementById('data-agendamento');
    
    if (dataAgendamento) {
        flatpickr(dataAgendamento, {
            minDate: 'today',
            dateFormat: 'd/m/Y',
            locale: 'pt'
        });
    }
    
    // Evento para o botão de agendamento
    const btnAgendar = document.getElementById('btn-agendar');
    if (btnAgendar) {
        btnAgendar.addEventListener('click', () => {
            const data = document.getElementById('data-agendamento').value;
            const horario = document.getElementById('horario-agendamento').value;
            const tipoServico = document.querySelector('input[name="tipo-servico"]:checked').value;
            
            if (!data || !horario) {
                alert('Por favor, selecione data e horário para o agendamento.');
                return;
            }
            
            const servico = tipoServico === 'retirada' ? 'Retirada no Local' : 'Tele-Entrega';
            alert(`Agendamento confirmado!\nServiço: ${servico}\nData: ${data}\nHorário: ${horario}`);
        });
    }
});