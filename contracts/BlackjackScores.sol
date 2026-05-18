// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @notice On-chain blackjack score recorder for Blackjack on Base.
contract BlackjackScores {
    struct Score {
        uint32 wins;
        uint32 losses;
        uint32 pushes;
    }

    event ScoreRecorded(
        address indexed player,
        uint32 wins,
        uint32 losses,
        uint32 pushes
    );

    mapping(address => Score) public scores;

    /// @notice Record the caller's cumulative score.
    function record(uint32 wins, uint32 losses, uint32 pushes) external {
        scores[msg.sender] = Score({ wins: wins, losses: losses, pushes: pushes });
        emit ScoreRecorded(msg.sender, wins, losses, pushes);
    }

    /// @notice Read a player's score.
    function getScore(address player)
        external
        view
        returns (uint32 wins, uint32 losses, uint32 pushes)
    {
        Score storage s = scores[player];
        return (s.wins, s.losses, s.pushes);
    }
}
