import { getVoteCounts, VoteCountsResponseDto } from '@/api/adminApi';
import React, { useEffect, useState } from 'react';

const VoteDisplay: React.FC = () => {
  const [voteData, setVoteData] = useState<VoteCountsResponseDto | null>(null);

  useEffect(() => {
    // Simulate fetching data (replace this with your API call)
    const fetchVoteCounts = async () => {
      // Replace with actual API call
      const data = await getVoteCounts();
      setVoteData(data);
    };

    fetchVoteCounts();
  }, []);

  if (!voteData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen py-6 flex flex-col justify-center items-center sm:py-12">
      <h2 className='text-2xl font-bold m-4'>Male Votes</h2>
      <ul>
        {voteData.maleVotes.map((vote) => (
          <li key={vote.selectionId} className='font-poppins mb-2 text-lg'>
            {vote.selectionName}: <span className='text-violet-600'>{vote.voteCount}</span>
          </li>
        ))}
      </ul>
      <h2 className='text-2xl font-bold m-4'>Female Votes</h2>
      <ul>
        {voteData.femaleVotes.map((vote) => (
          <li key={vote.selectionId} className='font-poppins mb-2 text-lg'>
            {vote.selectionName}: <span className='text-violet-600'>{vote.voteCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteDisplay;
