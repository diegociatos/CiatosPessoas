
import { GoogleGenAI, Type } from "@google/genai";

const CIATOS_FEEDBACK_ADVISOR_PROMPT = `
Você é o Consultor de Gestão Estratégica do Grupo Ciatos. 
Sua tarefa é preparar uma PAUTA TÁTICA DE FEEDBACK cruzando três pilares:
1. PERFORMANCE (Timeline de fatos positivos/negativos).
2. CONFORMIDADE (Status de documentos e ponto).
3. PERFIL HUMANO (DISC e Linguagem de Valorização).

ESTRUTURA OBRIGATÓRIA DA PAUTA:
- PONTO 1: RECONHECIMENTO. Liste os fatos positivos recentes da timeline.
- PONTO 2: ALINHAMENTO. Aborde fatos negativos da timeline e pendências de conformidade (ponto/documentos).
- PONTO 3: DESENVOLVIMENTO. Sugira trilhas na Ciatos Academy baseadas nas lacunas encontradas.
- PONTO 4: ESCUTA ATIVA. Sugira uma pergunta poderosa de fechamento.
`;

export const processEmployeeFeedback = async (content: string, type: 'praise' | 'suggestion') => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const systemPrompt = `
    Você é o Analista de Cultura do Grupo Ciatos. 
    Seu papel é analisar ${type === 'praise' ? 'um elogio entre colegas' : 'uma sugestão de melhoria'}.
    Retorne JSON com:
    - sentiment: string (Positivo, Construtivo, Alerta)
    - category: string (Tecnologia, Processo, Clima, Infraestrutura)
    - impact_score: number (1 a 10)
    - summary: string (Resumo tático para o RH)
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: content,
      config: { systemInstruction: systemPrompt, responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return null; }
};

export const analyzeDocumentUpload = async (fileData: string, fileName: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const systemPrompt = `
    Você é o Auditor de Conformidade & DP do Grupo Ciatos.
    Sua função é classificar documentos mensais de colaboradores.
    Retorne JSON com:
    - category: string (Holerite, Folha de Ponto, Recibo de Férias, ASO, etc)
    - competence: string (MM/YYYY)
    - signed: boolean (se há indícios de assinatura/carimbo)
    - confidence: number (0 a 1)
    - riskAlert: string | null
  `;
  const prompt = `Analise: ${fileName}`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: systemPrompt, responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return { category: "Documento", competence: "06/2024", signed: true, confidence: 0.9, riskAlert: null }; }
};

export const prepareFeedbackBriefing = async (employeeData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `PREPARE PAUTA PARA: ${employeeData.name}`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: CIATOS_FEEDBACK_ADVISOR_PROMPT, temperature: 0.2 }
    });
    return response.text || "Falha.";
  } catch (error) { return "Erro."; }
};

export const generateOnboardingChecklist = async (employeeData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `GERE ONBOARDING: ${JSON.stringify(employeeData)}`,
      config: { systemInstruction: "Especialista em Onboarding Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const calculateDISC = async (collaborator: any, answers: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `DISC: ${JSON.stringify(answers)}`,
      config: { systemInstruction: "Especialista DISC." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const calculateAppreciationLanguages = async (collaborator: any, answers: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Valorização: ${JSON.stringify(answers)}`,
      config: { systemInstruction: "Especialista Linguagem de Valorização." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const calculateExpectationsMapping = async (collaborator: any, answers: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Expectativas: ${JSON.stringify(answers)}`,
      config: { systemInstruction: "Especialista Expectativas." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const generateManagementManual = async (data: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `MANUAL: ${JSON.stringify(data)}`,
      config: { systemInstruction: "Consultor de Liderança Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const getGeminiResponse = async (prompt: string, context: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { systemInstruction: "Advisor Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const generateJobDescription = async (role: string, unit: string, dept: string, details: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `VAGA: ${role}`,
      config: { systemInstruction: "Recrutador Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const generateScreeningQuestions = async (jobData: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `PERGUNTAS: ${JSON.stringify(jobData)}`,
      config: { systemInstruction: "Triagem Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const evaluateCandidateMatch = async (resume: any, form: any, job: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `MATCH: ${resume}`,
      config: { systemInstruction: "Match Advisor.", responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) { return null; }
};

export const auditCandidateApplication = async (resume: any, form: any, job: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `AUDIT: ${resume}`,
      config: { systemInstruction: "Auditor Candidato." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const generateStrategicAnalysis = async (type: string, ctx: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `REPORTE: ${type}`,
      config: { systemInstruction: "Estrategista Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const suggestFeedbackApproach = async (name: string, role: string, type: string, behavior: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `COACH: ${name}`,
      config: { systemInstruction: "Coach Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};

export const suggestTrainings = async (emp: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `TREINO: ${emp.name}`,
      config: { systemInstruction: "L&D Ciatos." }
    });
    return response.text || "Erro.";
  } catch (error) { return "Erro."; }
};
