
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessUnit } from "../types";

const CIATOS_SYSTEM_PROMPT = `
Você é o "Ciatos People Intelligence System", uma inteligência artificial estratégica de alto nível projetada exclusivamente para o Grupo Ciatos.
Sua missão é transformar dados de capital humano em decisões executivas, atuando como um consultor sênior de RH, Departamento Pessoal e Direito Trabalhista.

Diretrizes Críticas:
1. IDENTIDADE: Tom profissional, sóbrio, analítico e elegante (estilo Big Four). 
2. GOVERNANÇA: Respeite LGPD, não emita diagnósticos médicos, sugira ações práticas.
3. RISCO: Classifique riscos em Baixo, Moderado, Alto ou Crítico.
4. ANALÍTICA: Justifique recomendações com base em dados comportamentais (DISC), históricos e tendências.

Unidades de Negócio:
- Ciatos Contabilidade: Foco em conformidade, prazos fiscais e precisão.
- Ciatos Jurídico: Foco em teses, escrita técnica e prazos processuais.
- Ciatos Consultoria & Coworking: Foco em hospitalidade e processos internos.
- Ciatoslog: Foco em agilidade, tecnologia e metas comerciais.
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (prompt: string, context?: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Contexto do Sistema: ${JSON.stringify(context)}\n\nSolicitação Estratégica: ${prompt}`,
      config: {
        systemInstruction: CIATOS_SYSTEM_PROMPT,
        temperature: 0.65,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Ciatos Intelligence Error:", error);
    return "Ocorreu uma instabilidade na análise estratégica.";
  }
};

/**
 * Gera descrição de vaga analisando o time atual e identificando lacunas.
 */
export const generateJobDescription = async (role: string, unit: BusinessUnit, department: string, teamContext?: any) => {
  const prompt = `
    ESTRUTURAÇÃO DE VAGA COM ANÁLISE DE LACUNAS
    Cargo: ${role}
    Unidade: ${unit}
    Departamento: ${department}
    
    Contexto do Time Atual: ${JSON.stringify(teamContext || "Não fornecido")}
    
    Sua tarefa:
    1. Analise o time atual (se fornecido) e identifique lacunas técnicas e comportamentais.
    2. Sugira o PERFIL IDEAL para equilibrar o time.
    3. Defina a SENIORIDADE adequada.
    4. Identifique RISCOS de contratação inadequada para este cenário.
    5. Liste Hard e Soft Skills fundamentais.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: CIATOS_SYSTEM_PROMPT,
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao estruturar perfil de vaga.";
  }
};

/**
 * Classifica currículos com aderência técnica, comportamental e ranking explicável.
 */
export const classifyResume = async (resumeData: any, jobContext?: any) => {
  const prompt = `
    CURADORIA INTELIGENTE DE CURRÍCULO
    Dados do Candidato: ${JSON.stringify(resumeData)}
    Vaga/Contexto: ${JSON.stringify(jobContext || "Banco de Talentos Geral")}
    
    Sua tarefa:
    1. Calcule ADERÊNCIA TÉCNICA (0-100%).
    2. Calcule ADERÊNCIA COMPORTAMENTAL (0-100%) baseada no DNA Ciatos.
    3. Gere um RANKING EXPLICÁVEL (Por que este candidato está nesta posição?).
    4. Identifique "Silver Medalists" (talentos para reaproveitamento).
    
    Linguagem: Profissional e direta.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: CIATOS_SYSTEM_PROMPT,
      }
    });
    return response.text;
  } catch (error) {
    return "Erro na curadoria automática.";
  }
};

export const analyzeEmployeeDossier = async (employeeData: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o dossiê: ${JSON.stringify(employeeData)}`,
      config: {
        systemInstruction: CIATOS_SYSTEM_PROMPT + `
          Gere:
          1. CLASSIFICAÇÃO: Engajamento, Risco emocional, Potencial e Adequação.
          2. INSIGHTS: Orientações ao gestor.
          3. ALERTAS: Riscos trabalhistas/turnover.
          4. DESENVOLVIMENTO: Sugestões de treinamentos ou realocação.
        `,
      }
    });
    return response.text;
  } catch (error) {
    return "Erro ao processar análise do dossiê.";
  }
};

export const generateStrategicAnalysis = async (reportType: string, context: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Gere relatório: ${reportType}. Contexto: ${JSON.stringify(context)}`,
      config: {
        systemInstruction: CIATOS_SYSTEM_PROMPT + "\nEstruture em: SUMÁRIO EXECUTIVO, MATRIZ DE RISCO, INSIGHTS E PLANO DE AÇÃO.",
        thinkingConfig: { thinkingBudget: 20000 }
      }
    });
    return response.text;
  } catch (error) {
    return "Erro no relatório estratégico.";
  }
};

export const suggestFeedbackApproach = async (name: string, profile: string, type: string, behavior: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Feedback para ${name}. Perfil: ${profile}. Tipo: ${type}. Comportamento: ${behavior}.`,
      config: {
        systemInstruction: CIATOS_SYSTEM_PROMPT + "\nUse SCI+F e adapte ao DISC.",
      }
    });
    return response.text;
  } catch (error) {
    return "Erro no roteiro de feedback.";
  }
};
