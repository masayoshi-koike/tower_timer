import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { 
    ignores: [
      'public/', 
      'vendor/', 
      'node_modules/', 
      'build/',
      'app/assets/builds/'
    ] 
  },
  
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, 
        ...globals.node,    
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      
      'react/react-in-jsx-scope': 'off',
      
      'react/prop-types': 'off',
      
      'tailwindcss/no-custom-classname': 'off',
    },
    settings: {
      react: { 
        version: 'detect' 
      },
    },
  },
  
  eslintConfigPrettier
);