-- Script para actualizar la columna icon en la tabla technologies
-- Cambia de VARCHAR(255) a TEXT para permitir SVGs más largos
 
ALTER TABLE technologies 
ALTER COLUMN icon TYPE TEXT; 