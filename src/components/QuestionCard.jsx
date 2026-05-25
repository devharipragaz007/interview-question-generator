import React from 'react';

const QuestionCard = ({ question, idx }) => {
    return (
        <div className="bg-white rounded-lg shadow p-4 mb-4">
            <p className="text-gray-800 text-sm"> {idx + 1}. {question}</p>
        </div>
    );
};

export default QuestionCard;