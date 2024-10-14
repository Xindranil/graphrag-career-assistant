import neo4j from 'neo4j-driver';

let driver: neo4j.Driver;

export const initializeNeo4j = () => {
  driver = neo4j.driver(
    'neo4j+s://dc269e6a.databases.neo4j.io',
    neo4j.auth.basic('neo4j', 'D__Zcpk83Lk6YRKNWbz_pFCaT-cVSVyw21_KWwTftt0')
  );
};

export const createKnowledgeGraph = async (question: string, answer: string) => {
  const session = driver.session();

  try {
    await session.run(
      `
      MERGE (q:Question {text: $question})
      MERGE (a:Answer {text: $answer})
      MERGE (q)-[:HAS_ANSWER]->(a)
      `,
      { question, answer }
    );
  } finally {
    await session.close();
  }
};

export const closeNeo4jConnection = () => {
  driver.close();
};