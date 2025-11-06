import './FormContinent.css'

interface FormContinentProps {
    onClose: () => void;
}

const FormContinent: React.FC<FormContinentProps> = ({ onClose }) => {

    const HandleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onClose();
        // Terminar essa bomba
    }

    return (
        <form onSubmit={HandleSubmit} className="modal-form">
            <h2>Cadastrar continente</h2>

            <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input type="text" id="nome" name="nome" required />
            </div>

            <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" rows={4} required />
            </div>

            <div className="form-buttons">
                <button type="button" className="btn-cancel" onClick={onClose}>
                    Cancelar
                </button>
                <button type="submit" className="btn-submit">
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default FormContinent;