import React from 'react';

function TestTailwind() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold text-[#4361ee]">
        Tailwind CSS está funcionando correctamente
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Botones</h3>
          <div className="space-y-2">
            <button className="btn-primary">Primario</button>
            <button className="btn-secondary">Secundario</button>
            <button className="btn-danger">Peligro</button>
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Formularios</h3>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="test@example.com" />
          </div>
        </div>
        
        <div className="card">
          <h3 className="font-bold text-lg mb-2">Estados</h3>
          <div className="error-message">Este es un mensaje de error</div>
          <div className="success-message mt-2">Este es un mensaje de éxito</div>
        </div>
      </div>
    </div>
  );
}

export default TestTailwind;